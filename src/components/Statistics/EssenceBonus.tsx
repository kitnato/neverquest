import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssenceBonus } from "@neverquest/icons/essence-bonus.svg";
import { deltas } from "@neverquest/state/deltas";
import { essenceBonus } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function EssenceBonus() {
  const essenceBonusValue = useRecoilValue(essenceBonus);

  useDeltaText({
    delta: deltas("essenceBonus"),
    format: "percentage",
    value: essenceBonus,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay
        contents={formatValue({ format: "percentage", value: essenceBonusValue })}
        Icon={IconEssenceBonus}
        tooltip="Essence loot bonus"
      />

      <FloatingText deltaType="essenceBonus" />
    </Stack>
  );
}
