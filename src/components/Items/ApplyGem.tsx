import { Dropdown, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GEM_FITTING_COST } from "@neverquest/data/inventory";
import { useApplyGem } from "@neverquest/hooks/actions/useApplyGem";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { armor, canApplyGem, shield, weapon } from "@neverquest/state/items";
import type { GemItem } from "@neverquest/types";
import { GEAR_TYPES, type Gear } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ApplyGem({ gem }: { gem: GemItem }) {
  const gemFitting = {
    armor: {
      canApply: useRecoilValue(canApplyGem("armor")),
      gear: useRecoilValue(armor),
    },
    shield: {
      canApply: useRecoilValue(canApplyGem("shield")),
      gear: useRecoilValue(shield),
    },
    weapon: {
      canApply: useRecoilValue(canApplyGem("weapon")),
      gear: useRecoilValue(weapon),
    },
  };

  const applyGem = useApplyGem();

  return (
    <Dropdown onSelect={(slot) => applyGem({ gem, slot: slot as Gear })}>
      <Dropdown.Toggle variant="outline-dark">Apply</Dropdown.Toggle>

      <Dropdown.Menu>
        {GEAR_TYPES.map((current) => {
          const { canApply, gear } = gemFitting[current];
          const { gems, name } = gear;

          return (
            <Dropdown.Item
              className={CLASS_FULL_WIDTH_JUSTIFIED}
              disabled={!canApply}
              eventKey={current}
              key={current}
            >
              <Stack direction="horizontal" gap={1}>
                <span>{capitalizeAll(name)}</span>

                <IconImage Icon={IconEssence} size="small" />

                {GEM_FITTING_COST[gems.length] ?? LABEL_EMPTY}
              </Stack>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
