import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRank from "@neverquest/icons/rank.svg?react";
import { attributeRank } from "@neverquest/state/attributes";
import type { Attribute } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AttributeRank({ attribute }: { attribute: Attribute }) {
  const attributeRankState = attributeRank(attribute);
  const attributeRankValue = useRecoilValue(attributeRankState);

  useDeltaText({
    delta: attribute,
    state: attributeRankState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconRank} tooltip="Rank">
        {formatNumber({ value: attributeRankValue })}
      </IconDisplay>

      <FloatingTextQueue delta={attribute} />
    </Stack>
  );
}
