import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RageMeter } from "@neverquest/components/Monster/RageMeter";
import { RAGE } from "@neverquest/data/monster";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRage from "@neverquest/icons/rage.svg?react";
import { stage } from "@neverquest/state/encounter";
import { rage } from "@neverquest/state/monster";

export function Rage() {
  const stageValue = useRecoilValue(stage);

  useDeltaText({
    delta: "rage",
    ignoreZero: true,
    state: rage,
  });

  if (stageValue >= RAGE.requiredStage) {
    return (
      <IconDisplay Icon={IconRage} tooltip="Rage">
        <RageMeter />
      </IconDisplay>
    );
  }
}
