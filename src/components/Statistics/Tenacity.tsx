import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconTenacity } from "@neverquest/icons/tenacity.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { tenacity } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Tenacity() {
  const isShowingTenacity = useRecoilValue(isShowing("tenacity"));
  const tenacityValue = useRecoilValue(tenacity);
  const skillTenacity = useRecoilValue(skills("armorcraft"));

  useDeltaText({
    atomDelta: deltas("tenacity"),
    atomValue: tenacity,
  });

  if (!isShowingTenacity) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{skillTenacity ? formatPercentage(tenacityValue) : LABEL_EMPTY}</span>

          <FloatingText deltaType="tenacity" />
        </Stack>
      }
      Icon={IconTenacity}
      isAnimated
      tooltip="Chance to skip recovery"
    />
  );
}
