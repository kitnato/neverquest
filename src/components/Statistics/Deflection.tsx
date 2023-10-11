import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { isSkillAcquired } from "@neverquest/state/skills";
import { deflection } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Deflection() {
  const deflectionValue = useRecoilValue(deflection);
  const armorcraftValue = useRecoilValue(isSkillAcquired("armorcraft"));

  useDeltaText({
    delta: "deflection",
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
          <span>{formatValue({ format: "percentage", value: deflectionValue })}</span>

          <FloatingTextQueue delta="deflection" />
        </Stack>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Deflection chance"
    />
  );
}
