import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRank from "@neverquest/icons/rank.svg?react";
import { masteryRank } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MasteryRank({ mastery }: { mastery: Mastery }) {
  const masteryRankState = masteryRank(mastery);
  const masteryRankValue = useRecoilValue(masteryRankState);

  useDeltaText({
    delta: mastery,
    state: masteryRankState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay
        Icon={IconRank}
        iconProps={{ overlayPlacement: "bottom", size: "small" }}
        tooltip="Rank"
      >
        {formatNumber({ value: masteryRankValue })}
      </IconDisplay>

      <DeltasDisplay delta={mastery} />
    </Stack>
  );
}
