import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconExecution from "@neverquest/icons/execution.svg?react";
import { weapon } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { execution } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Execution() {
  const executionValue = useRecoilValue(execution);
  const siegecraftValue = useRecoilValue(isSkillAcquired("siegecraft"));
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    !siegecraftValue ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip !== "two-handed");

  useDeltaText({
    delta: "execution",
    format: "percentage",
    stop: () => isEmpty,
    value: execution,
  });

  if (isEmpty) {
    return null;
  }

  return (
    <IconDisplay Icon={IconExecution} isAnimated tooltip="Execution threshold">
      <Stack direction="horizontal">
        <span>
          {siegecraftValue
            ? executionValue === 0
              ? LABEL_EMPTY
              : formatNumber({ decimals: 0, format: "percentage", value: executionValue })
            : LABEL_EMPTY}
        </span>

        <FloatingTextQueue delta="execution" />
      </Stack>
    </IconDisplay>
  );
}
