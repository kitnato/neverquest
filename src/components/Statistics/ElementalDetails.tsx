import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { armor, weapon } from "@neverquest/state/inventory";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatTime } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function ElementalDetails({ slot }: { slot: "armor" | "weapon" }) {
  const { gems } = useRecoilValue<GearItem | GearItemUnequipped>(slot === "armor" ? armor : weapon);
  const totalElementalEffectsValue = useRecoilValue(totalElementalEffects);

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Elemental:</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.type.localeCompare(b.type))).map(({ item }) => {
          const { id, type } = item;
          const elemental = GEM_ELEMENTALS[type];
          const { damage, duration } = totalElementalEffectsValue[slot][elemental];

          return (
            <div key={id}>
              <span className={ELEMENTALS[elemental].color}>{`+${damage}`}</span>
              {" · "}
              <IconImage Icon={ELEMENTALS[elemental].Icon} size="tiny" />
              {` ${formatTime(duration)}`}
            </div>
          );
        })}
      </td>
    </tr>
  );
}
