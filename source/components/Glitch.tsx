import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { GLITCH_NUMBER, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { stage } from "@neverquest/state/encounter";
import { getFromRange, getLinearMapping, getRange } from "@neverquest/utilities/getters";

const CHARACTERS = "!·&=?¿|@#~¬+/\\^*[]{}-_<>";

const LATENCY = 80;

function getGlitchingElement() {
  const textElements = document.body
    .querySelector(".somnium")
    ?.querySelectorAll("button, h6, span, strong");

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

  if (textContent === null) {
    return;
  }

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

  const interval = useMemo(
    () =>
      getFromRange(
        getRange({
          factor: getLinearMapping({ offset: LEVELLING_MAXIMUM, stage: stageValue }) / 100,
          ranges: [
            { maximum: 20_000, minimum: 18_000 },
            { maximum: 3000, minimum: 2500 },
          ],
        }),
      ),
    [stageValue],
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

            setGlitchingElements((current) => ({
              ...current,
              [nanoid()]: {
                duration: 1500,
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
        setIntervalElapsed((current) => current + elapsed);
      }

      for (const [ID, { duration, element, latency, originalText, position }] of Object.entries(
        glitchingElements,
      )) {
        if (duration <= 0) {
          element.classList.remove("monospaced");
          element.textContent = originalText;

          setGlitchingElements(({ [ID]: _, ...current }) => ({ ...current }));
        } else {
          if (latency <= 0) {
            glitchElementAt({ element, originalText });
          }

          setGlitchingElements((current) => ({
            ...current,
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
    stop: stageValue <= LEVELLING_MAXIMUM,
  });

  return <></>;
}
