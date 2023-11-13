import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconExecution from "@neverquest/icons/execution.svg?react";
import { weapon } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { executionThreshold } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ExecutionThreshold() {
  const executionValue = useRecoilValue(executionThreshold);
  const siegecraftValue = useRecoilValue(isSkillAcquired("siegecraft"));
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    !siegecraftValue ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip !== "two-handed") ||
    executionValue === 0;

  useDeltaText({
    delta: "executionThreshold",
    format: "percentage",
    state: executionThreshold,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay Icon={IconExecution} isAnimated tooltip="Execution threshold">
        <Stack direction="horizontal" gap={1}>
          <span>
            {siegecraftValue
              ? executionValue === 0
                ? LABEL_EMPTY
                : formatNumber({ decimals: 0, format: "percentage", value: executionValue })
              : LABEL_EMPTY}
          </span>

          <DeltasDisplay delta="executionThreshold" />
        </Stack>
      </IconDisplay>
    );
  }
}
