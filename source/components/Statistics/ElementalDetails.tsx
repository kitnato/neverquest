import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { ELEMENTALS, GEMS } from "@neverquest/data/items";
import { armor, elementalEffects, weapon } from "@neverquest/state/gear";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function ElementalDetails({ slot }: { slot: "armor" | "weapon" }) {
  const { gems } = useRecoilValue<GearItem | GearItemUnequipped>(slot === "armor" ? armor : weapon);
  const elementalEffectsValue = useRecoilValue(elementalEffects);

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Elemental:</td>

      <td>
        {stackItems(
          gems.toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
        ).map(({ item }) => {
          const { ID, name } = item;
          const { elemental } = GEMS[name];
          const { color, Icon } = ELEMENTALS[elemental];
          const { damage, duration } = elementalEffectsValue[slot][elemental];

          return (
            <Stack direction="horizontal" gap={1} key={ID}>
              <span className={color}>{`+${damage}`}</span>

              {LABEL_SEPARATOR}

              <IconImage Icon={Icon} isSmall />

              {`${formatNumber({ format: "time", value: duration })}`}
            </Stack>
          );
        })}
      </td>
    </tr>
  );
}
