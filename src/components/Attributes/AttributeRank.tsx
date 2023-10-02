import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRank } from "@neverquest/icons/rank.svg";
import { attributeRank } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import type { Attribute } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function AttributeRank({ attribute }: { attribute: Attribute }) {
  const attributeRankState = attributeRank(attribute);
  const attributeRankValue = useRecoilValue(attributeRankState);

  useDeltaText({
    delta: deltas(attribute),
    value: attributeRankState,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay
        contents={formatValue({ value: attributeRankValue })}
        Icon={IconRank}
        tooltip="Rank"
      />

      <FloatingText delta={attribute} />
    </Stack>
  );
}
