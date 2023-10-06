import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { armor, weapon } from "@neverquest/state/items";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function ElementalDetails({ slot }: { slot: "armor" | "weapon" }) {
  const { gems } = useRecoilValue<GearItem | GearItemUnequipped>(slot === "armor" ? armor : weapon);
  const totalElementalEffectsValue = useRecoilValue(totalElementalEffects);

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Elemental:</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.name.localeCompare(b.name))).map(({ item }) => {
          const { id, name } = item;
          const elemental = GEM_ELEMENTALS[name];
          const { damage, duration } = totalElementalEffectsValue[slot][elemental];

          return (
            <Stack direction="horizontal" gap={1} key={id}>
              <span className={ELEMENTALS[elemental].color}>{`+${damage}`}</span>

              {LABEL_SEPARATOR}

              <IconImage Icon={ELEMENTALS[elemental].Icon} size="small" />

              {`${formatValue({ format: "time", value: duration })}`}
            </Stack>
          );
        })}
      </td>
    </tr>
  );
}
