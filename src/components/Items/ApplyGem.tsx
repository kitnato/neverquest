import { Dropdown } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GEM_FITTING_COST } from "@neverquest/data/inventory";
import { useApplyGem } from "@neverquest/hooks/actions/useApplyGem";
import { ReactComponent as IconScrap } from "@neverquest/icons/scrap.svg";
import { armor, canApplyGem, shield, weapon } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import { GEAR_TYPES, type Gear } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ApplyGem({ gem }: { gem: GemItem }) {
  const gemFitting = {
    armor: {
      canApply: useRecoilValue(canApplyGem("armor")),
      fittedGems: useRecoilValue(armor).gems.length,
    },
    shield: {
      canApply: useRecoilValue(canApplyGem("shield")),
      fittedGems: useRecoilValue(shield).gems.length,
    },
    weapon: {
      canApply: useRecoilValue(canApplyGem("weapon")),
      fittedGems: useRecoilValue(weapon).gems.length,
    },
  };

  const applyGem = useApplyGem();

  return (
    <Dropdown onSelect={(slot) => applyGem({ gem, slot: slot as Gear })}>
      <Dropdown.Toggle variant="outline-dark">Apply</Dropdown.Toggle>

      <Dropdown.Menu>
        {GEAR_TYPES.map((gear) => (
          <Dropdown.Item
            className={CLASS_FULL_WIDTH_JUSTIFIED}
            disabled={!gemFitting[gear].canApply}
            eventKey={gear}
            key={gear}
          >
            <span>{capitalizeAll(gear)}</span>

            <span>
              <IconImage Icon={IconScrap} size="tiny" />
              &nbsp;{GEM_FITTING_COST[gemFitting[gear].fittedGems] ?? LABEL_EMPTY}
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
