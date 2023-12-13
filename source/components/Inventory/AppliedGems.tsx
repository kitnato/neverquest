import { Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { ELEMENTALS, GEMS, GEMS_MAXIMUM } from "@neverquest/data/items";
import IconGem from "@neverquest/icons/gem.svg?react";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getGearElementalEffects } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGems({ gearItem }: { gearItem: GearItem | GearItemUnequipped }) {
  const { gems } = gearItem;
  const appliedGems = gems.length;
  const elementalEffects = getGearElementalEffects(gearItem);

  if (appliedGems > 0) {
    return (
      <tr>
        <td className={CLASS_TABLE_CELL_ITALIC}>{`Gems (${appliedGems}/${GEMS_MAXIMUM}):`}</td>

        <td>
          <Stack gap={1}>
            {stackItems(
              gems.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
            ).map(({ amount, item }) => {
              const { ID, name } = item;
              const { elemental } = GEMS[name];
              const { color, Icon } = ELEMENTALS[elemental];
              const effect = elementalEffects[elemental];

              return (
                <Stack direction="horizontal" gap={1} key={ID}>
                  <span className={color}>{`${
                    typeof effect === "number"
                      ? `+${formatNumber({ decimals: 0, format: "percentage", value: effect })}`
                      : formatNumber({ value: effect.damage })
                  }`}</span>

                  {LABEL_SEPARATOR}

                  <IconImage Icon={Icon} isSmall />

                  {`${
                    typeof effect === "number"
                      ? `+${formatNumber({ decimals: 0, format: "percentage", value: effect })}`
                      : formatNumber({ format: "time", value: effect.duration })
                  } `}

                  {LABEL_SEPARATOR}

                  <IconImage Icon={IconGem} isSmall />

                  {amount}
                </Stack>
              );
            })}
          </Stack>
        </td>
      </tr>
    );
  }
}
