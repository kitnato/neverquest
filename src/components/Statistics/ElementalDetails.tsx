import { useRecoilValue } from "recoil";

import { IconImage } from "../IconImage";
import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { armor, weapon } from "@neverquest/state/inventory";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { ElementalGear } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function ElementalDetails({ slot }: { slot: ElementalGear }) {
  const armorValue = useRecoilValue(armor);
  const totalElementalEffectsValue = useRecoilValue(totalElementalEffects(slot));
  const weaponValue = useRecoilValue(weapon);

  const { gems } = slot === "armor" ? armorValue : weaponValue;

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Elemental:</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.type.localeCompare(b.type))).map(({ item }) => {
          const { id, type } = item;
          const elemental = GEM_ELEMENTALS[type];
          const { damage, duration } = totalElementalEffectsValue[elemental];

          return (
            <div key={id}>
              <span className={ELEMENTALS[elemental].color}>{`+${damage}`}</span>
              {" · "}
              <IconImage Icon={ELEMENTALS[elemental].Icon} size="tiny" />
              {` ${formatMilliseconds(duration)}`}
            </div>
          );
        })}
      </td>
    </tr>
  );
}
