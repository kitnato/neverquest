import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS_MAXIMUM, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { elementalEffects } from "@neverquest/state/statistics";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { isArmor, isShield } from "@neverquest/types/type-guards";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGems({ gearItem }: { gearItem: GearItem | GearItemUnequipped }) {
  const elementalEffectsValue = useRecoilValue(elementalEffects);

  const { gems } = gearItem;
  const appliedGems = gems.length;

  if (appliedGems === 0) {
    return null;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>{`Gems (${appliedGems}/${GEMS_MAXIMUM}):`}</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.name.localeCompare(b.name))).map(
          ({ item, stack }) => {
            const { id, name } = item;
            const elemental = GEM_ELEMENTALS[name];
            const effect =
              elementalEffectsValue[
                isArmor(gearItem) ? "armor" : isShield(gearItem) ? "shield" : "weapon"
              ][elemental];

            return (
              <Stack direction="horizontal" gap={1} key={id}>
                <span className={ELEMENTALS[elemental].color}>{`${
                  typeof effect === "number"
                    ? `+${formatValue({ decimals: 0, format: "percentage", value: effect })}`
                    : formatValue({ value: effect.damage })
                }`}</span>

                {LABEL_SEPARATOR}

                <IconImage Icon={ELEMENTALS[elemental].Icon} size="small" />

                {`${
                  typeof effect === "number"
                    ? `+${formatValue({ decimals: 0, format: "percentage", value: effect })}`
                    : formatValue({ format: "time", value: effect.duration })
                }`}

                {LABEL_SEPARATOR}

                <IconImage Icon={IconGem} size="small" />

                {stack}
              </Stack>
            );
          },
        )}
      </td>
    </tr>
  );
}
