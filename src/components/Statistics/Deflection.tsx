import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { deflection } from "@neverquest/state/statistics";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Deflection() {
  const deflectionValue = useRecoilValue(deflection);
  const armorcraftValue = useRecoilValue(skills("armorcraft"));

  useDeltaText({
    delta: deltas("deflection"),
    format: "percentage",
    value: deflection,
  });

  if (!armorcraftValue || deflectionValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatPercentage(deflectionValue)}</span>

          <FloatingText deltaType="deflection" />
        </Stack>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Deflection chance"
    />
  );
}
