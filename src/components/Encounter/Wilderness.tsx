import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Monster } from "@neverquest/components/Monster";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconBossHiding from "@neverquest/icons/boss-hiding.svg?react";
import IconMonsterHiding from "@neverquest/icons/monster-hiding.svg?react";
import IconRemains from "@neverquest/icons/remains.svg?react";
import { isBoss, isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Wilderness() {
  const isBossValue = useRecoilValue(isBoss);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);

  if (isStageCompletedValue) {
    return (
      <Card className={getAnimationClass({ name: "flipInX" })}>
        <Card.Body>
          <IconDisplay gap={5} Icon={IconRemains} tooltip="Remains">
            <span className="fst-italic">Everything is dead.</span>
          </IconDisplay>
        </Card.Body>
      </Card>
    );
  }

  if (isStageStartedValue) {
    return <Monster />;
  }

  return (
    <Card className={getAnimationClass({ name: "zoomIn", speed: "fast" })}>
      <Card.Body>
        <IconDisplay
          gap={5}
          Icon={isBossValue ? IconBossHiding : IconMonsterHiding}
          tooltip={LABEL_UNKNOWN}
        >
          <span className="fst-italic">
            {isBossValue ? "A powerful presence looms." : "The darkness stirs."}
          </span>
        </IconDisplay>
      </Card.Body>
    </Card>
  );
}
