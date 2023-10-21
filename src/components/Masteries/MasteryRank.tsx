import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRank from "@neverquest/icons/rank.svg?react";
import { masteryRank } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function MasteryRank({ mastery }: { mastery: Mastery }) {
  const masteryRankState = masteryRank(mastery);
  const masteryRankValue = useRecoilValue(masteryRankState);

  useDeltaText({
    delta: "masteryRank",
    value: masteryRankState,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay
        contents={formatValue({ value: masteryRankValue })}
        Icon={IconRank}
        iconProps={{ overlayPlacement: "bottom", size: "small" }}
        tooltip="Rank"
      />

      <FloatingTextQueue delta="masteryRank" />
    </Stack>
  );
}
