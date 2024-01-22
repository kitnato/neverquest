import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { GLITCH_NUMBER, GLITCH_STAGE_MINIMUM, LEVELLING_CUTOFF } from "@neverquest/data/general";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { stage } from "@neverquest/state/encounter";
import { getFromRange, getLinearMapping, getRange } from "@neverquest/utilities/getters";

const CHARACTERS = "!·&=?¿|@#~¬+/\\^*[]{}-_<>";

const LATENCY = 70;

function getGlitchingElement() {
  const textElements = document.body
    .querySelector(".somnium")
    ?.querySelectorAll("button, h6, option, span, strong");

  if (textElements === undefined) {
    return;
  }

  return [...textElements]
    .map((element) => ({ element, nonce: Math.random() }))
    .toSorted(({ nonce: nonce1 }, { nonce: nonce2 }) => nonce1 - nonce2)
    .find(({ element: { textContent } }) => textContent !== null && textContent.length > 0);
}

function glitchElementAt({ element, originalText }: { element: Element; originalText: string }) {
  const { textContent } = element;

  if (textContent !== null) {
    element.textContent = [...textContent]
      .map((_, index) => {
        const glitchChance = Math.random();

        if (glitchChance <= 0.2) {
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }

        if (glitchChance <= 0.6) {
          return GLITCH_NUMBER;
        }

        return originalText[index];
      })
      .join("");
  }
}

export function Glitch() {
  const stageValue = useRecoilValue(stage);

  const [glitchingElements, setGlitchingElements] = useState<
    Record<
      string,
      {
        duration: number;
        element: Element;
        latency: number;
        originalText: string;
        position: number;
      }
    >
  >({});
  const [intervalElapsed, setIntervalElapsed] = useState(0);

  const factor = useMemo(
    () => getLinearMapping({ offset: GLITCH_STAGE_MINIMUM, stage: stageValue }) / LEVELLING_CUTOFF,
    [stageValue],
  );
  const interval = useMemo(
    () =>
      Math.round(
        getFromRange(
          getRange({
            factor,
            ranges: [
              { maximum: 60_000, minimum: 55_000 },
              { maximum: 12_000, minimum: 10_000 },
            ],
          }),
        ),
      ),
    [factor],
  );

  useAnimation({
    onFrame: (elapsed) => {
      if (intervalElapsed >= interval) {
        const glitchingElement = getGlitchingElement();

        if (glitchingElement !== undefined) {
          const { element } = glitchingElement;
          const { classList, textContent } = element;

          if (textContent !== null) {
            classList.add("monospaced");

            setGlitchingElements((elements) => ({
              ...elements,
              [nanoid()]: {
                duration: Math.round(
                  getFromRange(
                    getRange({
                      factor,
                      ranges: [
                        { maximum: 600, minimum: 400 },
                        { maximum: 3200, minimum: 2800 },
                      ],
                    }),
                  ),
                ),
                element,
                latency: LATENCY,
                originalText: textContent,
                position: Math.floor(Math.random() * textContent.length),
              },
            }));
          }
        }

        setIntervalElapsed(0);
      } else {
        setIntervalElapsed(intervalElapsed + elapsed);
      }

      for (const [ID, { duration, element, latency, originalText, position }] of Object.entries(
        glitchingElements,
      )) {
        if (duration <= 0) {
          element.classList.remove("monospaced");
          element.textContent = originalText;

          setGlitchingElements(({ [ID]: _, ...elements }) => ({ ...elements }));
        } else {
          if (latency <= 0) {
            glitchElementAt({ element, originalText });
          }

          setGlitchingElements((elements) => ({
            ...elements,
            [ID]: {
              duration: duration - elapsed,
              element,
              latency: latency <= 0 ? LATENCY : latency - elapsed,
              originalText,
              position,
            },
          }));
        }
      }
    },
    stop: stageValue < GLITCH_STAGE_MINIMUM,
  });

  return <></>;
}
