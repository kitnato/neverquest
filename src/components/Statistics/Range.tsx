import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRange } from "@neverquest/icons/range.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { range } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatTime } from "@neverquest/utilities/formatters";

export function Range() {
  const rangeValue = useRecoilValue(range);
  const isShowingValue = useRecoilValue(isShowing("range"));
  const skillArchery = useRecoilValue(skills("archery"));

  useDeltaText({
    delta: deltas("range"),
    stop: ({ previous }) => previous === null || !skillArchery,
    type: "time",
    value: range,
  });

  if (!isShowingValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>
            {skillArchery ? (rangeValue === 0 ? LABEL_EMPTY : formatTime(rangeValue)) : LABEL_EMPTY}
          </span>

          <FloatingText deltaType="range" />
        </Stack>
      }
      Icon={IconRange}
      isAnimated
      tooltip="Range"
    />
  );
}
