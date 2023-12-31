import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "../IconDisplay";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { ELEMENTALS, GEMS, GEMS_MAXIMUM } from "@neverquest/data/items";
import { gems } from "@neverquest/state/items";
import type { GearItem, GearItemUnequipped } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getGearElementalEffects } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGems({ gearItem }: { gearItem: GearItem | GearItemUnequipped }) {
  const gemsValue = useRecoilValue(gems(gearItem.ID));

  const { length } = gemsValue;
  const elementalEffects = getGearElementalEffects({ gear: gearItem, gems: gemsValue });

  if (length > 0) {
    return (
      <tr>
        <td className={CLASS_TABLE_CELL_ITALIC}>
          <span>{`Gems (${length} / ${GEMS_MAXIMUM}):`}</span>
        </td>

        <td>
          <Stack gap={1}>
            {stackItems(
              gemsValue.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
            ).map(({ amount, item }) => {
              const { ID, name } = item;
              const { elemental, Icon: GemIcon } = GEMS[name];
              const { color, Icon: ElementalIcon } = ELEMENTALS[elemental];
              const effect = elementalEffects[elemental];

              return (
                <Stack direction="horizontal" gap={1} key={ID}>
                  <span className={color}>
                    {typeof effect === "number"
                      ? `+${formatNumber({ decimals: 0, format: "percentage", value: effect })}`
                      : formatNumber({ value: effect.damage })}
                  </span>

                  {LABEL_SEPARATOR}

                  <IconDisplay Icon={ElementalIcon} iconProps={{ className: "small" }}>
                    <span>
                      {typeof effect === "number"
                        ? `+${formatNumber({ decimals: 0, format: "percentage", value: effect })}`
                        : formatNumber({ format: "time", value: effect.duration })}
                    </span>
                  </IconDisplay>

                  {LABEL_SEPARATOR}

                  <IconDisplay Icon={GemIcon} iconProps={{ className: "small" }}>
                    <span>{amount}</span>
                  </IconDisplay>
                </Stack>
              );
            })}
          </Stack>
        </td>
      </tr>
    );
  }
}
