import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconLuck } from "@neverquest/icons/luck.svg";
import { deltas } from "@neverquest/state/deltas";
import { hasItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { luck } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Luck() {
  const hasAntiqueCoin = useRecoilValue(hasItem("antique coin"));
  const isShowingLuck = useRecoilValue(isShowing("luck"));
  const luckValue = useRecoilValue(luck);

  useDeltaText({
    atomDelta: deltas("luck"),
    atomValue: luck,
  });

  if (!isShowingLuck) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{hasAntiqueCoin ? formatPercentage(luckValue) : LABEL_EMPTY}</span>

          <FloatingText deltaType="luck" />
        </Stack>
      }
      Icon={IconLuck}
      isAnimated
      tooltip="Luck"
    />
  );
}
