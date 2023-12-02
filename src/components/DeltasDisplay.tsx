import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import type { Delta } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function DeltasDisplay({ delta }: { delta: Delta }) {
  const deltasState = deltas(delta);

  const [deltasValue, setDeltas] = useRecoilState(deltasState);
  const resetDeltas = useResetRecoilState(deltasState);

  useEffect(() => resetDeltas, [resetDeltas]);

  return (
    <div className="d-flex flex-nowrap text-floating pe-none position-relative">
      {deltasValue.map(({ display, ID }) => (
        <small className="position-absolute top-50 start-100 translate-middle-y" key={ID}>
          <Stack
            className={getAnimationClass({
              name: "fadeOutUp",
              speed: "slower",
            })}
            onAnimationEnd={() => {
              setDeltas((current) => current.filter(({ ID: currentID }) => currentID !== ID));
            }}
          >
            {display.map(({ color, value }) => (
              <strong className={color} key={value}>
                {value}
              </strong>
            ))}
          </Stack>
        </small>
      ))}
    </div>
  );
}
