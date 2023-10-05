import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRank } from "@neverquest/icons/rank.svg";
import { deltas } from "@neverquest/state/deltas";
import { masteryRank } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function MasteryRank({ mastery }: { mastery: Mastery }) {
  const masteryRankState = masteryRank(mastery);
  const masteryRankValue = useRecoilValue(masteryRankState);

  useDeltaText({
    delta: deltas("masteryRank"),
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

      <FloatingText delta="masteryRank" />
    </Stack>
  );
}
