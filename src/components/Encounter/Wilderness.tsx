import { Card, CardBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Monster } from "@neverquest/components/Monster";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconBossHiding from "@neverquest/icons/boss-hiding.svg?react";
import IconFinality from "@neverquest/icons/finality.svg?react";
import IconMonsterHiding from "@neverquest/icons/monster-hiding.svg?react";
import IconRemains from "@neverquest/icons/remains.svg?react";
import { encounter, isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Wilderness() {
  const encounterValue = useRecoilValue(encounter);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);

  if (isStageCompletedValue) {
    return (
      <Card className={getAnimationClass({ animation: "flipInX" })}>
        <CardBody>
          <IconDisplay gap={5} Icon={IconRemains} tooltip="Remains">
            <span className="fst-italic">Everything is dead.</span>
          </IconDisplay>
        </CardBody>
      </Card>
    );
  }

  if (isStageStartedValue) {
    return <Monster />;
  }

  return (
    <Card className={getAnimationClass({ animation: "zoomIn", speed: "fast" })}>
      <CardBody>
        <IconDisplay
          gap={5}
          Icon={
            encounterValue === "boss"
              ? IconBossHiding
              : encounterValue === "monster"
                ? IconMonsterHiding
                : IconFinality
          }
          tooltip={LABEL_UNKNOWN}
        >
          <span className="fst-italic">
            {encounterValue === "boss"
              ? "A powerful presence looms."
              : encounterValue === "monster"
                ? "The darkness stirs."
                : "A grim entity is manifesting."}
          </span>
        </IconDisplay>
      </CardBody>
    </Card>
  );
}
