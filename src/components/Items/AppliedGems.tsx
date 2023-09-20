import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS_MAXIMUM, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { elementalEffects } from "@neverquest/state/statistics";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { isArmor, isShield } from "@neverquest/types/type-guards";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";
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
        {stackItems(gems.slice().sort((a, b) => a.type.localeCompare(b.type))).map(
          ({ item, stack }) => {
            const { id, type } = item;
            const elemental = GEM_ELEMENTALS[type];
            const effect =
              elementalEffectsValue[
                isArmor(gearItem) ? "armor" : isShield(gearItem) ? "shield" : "weapon"
              ][elemental];

            return (
              <div key={id}>
                <span className={ELEMENTALS[elemental].color}>{`${
                  typeof effect === "number" ? `+${formatPercentage(effect, 0)}` : effect.damage
                }`}</span>
                {" · "}
                <IconImage Icon={ELEMENTALS[elemental].Icon} size="tiny" />
                {` ${
                  typeof effect === "number"
                    ? `+${formatPercentage(effect, 0)}`
                    : formatTime(effect.duration)
                } · `}
                <IconImage Icon={IconGem} size="tiny" />
                &nbsp;
                {stack}
              </div>
            );
          },
        )}
      </td>
    </tr>
  );
}
