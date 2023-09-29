import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconExecution } from "@neverquest/icons/execution.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { skills } from "@neverquest/state/skills";
import { execution } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function Execution() {
  const executionValue = useRecoilValue(execution);
  const siegecraftValue = useRecoilValue(skills("siegecraft"));
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("execution"),
    value: execution,
  });

  if (
    !siegecraftValue ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip !== "two-handed")
  ) {
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

          <FloatingText deltaType="execution" />
        </Stack>
      }
      Icon={IconExecution}
      isAnimated
      tooltip="Execution threshold"
    />
  );
}
