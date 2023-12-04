import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { ELEMENTALS, GEMS, GEMS_MAXIMUM } from "@neverquest/data/items";
import IconGem from "@neverquest/icons/gem.svg?react";
import { elementalEffects } from "@neverquest/state/gear";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { isArmor, isShield } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGems({ gearItem }: { gearItem: GearItem | GearItemUnequipped }) {
  const elementalEffectsValue = useRecoilValue(elementalEffects);

  const { gems } = gearItem;
  const appliedGems = gems.length;

  if (appliedGems > 0) {
    return (
      <tr>
        <td className={CLASS_TABLE_CELL_ITALIC}>{`Gems (${appliedGems}/${GEMS_MAXIMUM}):`}</td>

        <td>
          {stackItems(
            gems.toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
          ).map(({ item, stack }) => {
            const { ID, name } = item;
            const { elemental } = GEMS[name];
            const { color, Icon } = ELEMENTALS[elemental];
            const effect =
              elementalEffectsValue[
                isArmor(gearItem) ? "armor" : isShield(gearItem) ? "shield" : "weapon"
              ][elemental];

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

                {stack}
              </Stack>
            );
          })}
        </td>
      </tr>
    );
  }
}
