import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS_MAXIMUM, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { armor, gearElementalEffects, weapon } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import type { Gear } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGems({ slot }: { slot: Exclude<Gear, "shield"> }) {
  const armorValue = useRecoilValue(armor);
  const gearElementalEffectsValue = useRecoilValue(gearElementalEffects(slot));
  const weaponValue = useRecoilValue(weapon);

  const { gems } = slot === "armor" ? armorValue : weaponValue;
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
            const { id, type } = item as GemItem;
            const elemental = GEM_ELEMENTALS[type];
            const { damage, duration } = gearElementalEffectsValue[elemental];

            return (
              <div key={id}>
                <span className={ELEMENTALS[elemental].color}>{`+${damage}`}</span>
                {" · "}
                <IconImage Icon={ELEMENTALS[elemental].Icon} size="tiny" />
                {` ${formatMilliseconds(duration)} · `}
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
