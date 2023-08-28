import { useRecoilValue } from "recoil";

import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { armor, gearElementalEffects } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import type { Gear } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function ElementalDetails({ slot }: { slot: Exclude<Gear, "shield"> }) {
  const { gems } = useRecoilValue(armor);
  const gearElementalEffectsValue = useRecoilValue(gearElementalEffects(slot));

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Elemental:</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.type.localeCompare(b.type))).map(({ item }) => {
          const { id, type } = item as GemItem;
          const elemental = GEM_ELEMENTALS[type];

          return (
            <div className={ELEMENTALS[elemental].color} key={id}>
              +{gearElementalEffectsValue[elemental].damage}
            </div>
          );
        })}
      </td>
    </tr>
  );
}
