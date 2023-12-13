import { Dropdown, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_EMPTY } from "@neverquest/data/general";
import { GEM_FITTING_COST } from "@neverquest/data/items";
import { useApplyGem } from "@neverquest/hooks/actions/useApplyGem";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { armor, canApplyGem, shield, weapon } from "@neverquest/state/gear";
import type { GemItem } from "@neverquest/types";
import { GEAR_TYPES, type Gear } from "@neverquest/types/unions";
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
    <Dropdown
      onSelect={(slot) => {
        if (slot !== null) {
          applyGem({ gem, slot: slot as Gear });
        }
      }}
    >
      <Dropdown.Toggle variant="outline-dark">Apply</Dropdown.Toggle>

      <Dropdown.Menu>
        {GEAR_TYPES.map((currentGear) => {
          const { canApply, gear } = gemFitting[currentGear];
          const { gems, name } = gear;

          return (
            <Dropdown.Item disabled={!canApply} eventKey={currentGear} key={currentGear}>
              <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
                <span className="mr-2">{capitalizeAll(name)}</span>

                <Stack direction="horizontal" gap={1}>
                  <IconImage Icon={IconEssence} isSmall />

                  {GEM_FITTING_COST[gems.length] ?? LABEL_EMPTY}
                </Stack>
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}