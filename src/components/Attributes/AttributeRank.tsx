import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRank from "@neverquest/icons/rank.svg?react";
import { attributeRank } from "@neverquest/state/attributes";
import type { Attribute } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function AttributeRank({ attribute }: { attribute: Attribute }) {
  const attributeRankState = attributeRank(attribute);
  const attributeRankValue = useRecoilValue(attributeRankState);

  useDeltaText({
    delta: attribute,
    value: attributeRankState,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay
        contents={formatValue({ value: attributeRankValue })}
        Icon={IconRank}
        tooltip="Rank"
      />

      <FloatingTextQueue delta={attribute} />
    </Stack>
  );
}
