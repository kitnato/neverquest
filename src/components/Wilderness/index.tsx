import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Monster } from "@neverquest/components/Monster";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { ReactComponent as IconHiding } from "@neverquest/icons/monster-hiding.svg";
import { ReactComponent as IconRemains } from "@neverquest/icons/monster-remains.svg";
import { isBoss, isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Wilderness() {
  const isBossValue = useRecoilValue(isBoss);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);

  const toggleAttack = useToggleAttack();

  useEffect(() => {
    if (isStageCompletedValue) {
      toggleAttack();
    }
  }, [isStageCompletedValue, toggleAttack]);

  if (isStageCompletedValue) {
    return (
      <Card className={getAnimationClass({ type: "flipInX" })}>
        <Card.Body>
          <IconDisplay
            contents={<span className="fst-italic">Everything is dead.</span>}
            Icon={IconRemains}
            isSpaced
            tooltip="Monster remains"
          />
        </Card.Body>
      </Card>
    );
  }

  if (isStageStartedValue) {
    return <Monster />;
  }

  return (
    <Card className={getAnimationClass({ speed: "fast", type: "zoomIn" })}>
      <Card.Body>
        <IconDisplay
          contents={
            <span className="fst-italic">
              {isBossValue ? "A powerful presence waits." : "The darkness stirs."}
            </span>
          }
          Icon={IconHiding}
          isSpaced
          tooltip={LABEL_UNKNOWN}
        />
      </Card.Body>
    </Card>
  );
}
