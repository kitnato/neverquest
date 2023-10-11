import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconExecution } from "@neverquest/icons/execution.svg";
import { weapon } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { execution } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

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
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>
            {siegecraftValue
              ? executionValue === 0
                ? LABEL_EMPTY
                : formatValue({ decimals: 0, format: "percentage", value: executionValue })
              : LABEL_EMPTY}
          </span>

          <FloatingTextQueue delta="execution" />
        </Stack>
      }
      Icon={IconExecution}
      isAnimated
      tooltip="Execution threshold"
    />
  );
}
