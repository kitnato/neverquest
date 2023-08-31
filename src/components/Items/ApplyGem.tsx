import { Dropdown } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useApplyGem } from "@neverquest/hooks/actions/useApplyGem";
import { canApplyGem } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import { GEAR_TYPES, type Gear } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ApplyGem({ gem }: { gem: GemItem }) {
  const canApplyGemValue = {
    armor: useRecoilValue(canApplyGem("armor")),
    shield: useRecoilValue(canApplyGem("shield")),
    weapon: useRecoilValue(canApplyGem("weapon")),
  };

  const applyGem = useApplyGem();

  return (
    <Dropdown onSelect={(slot) => applyGem({ gem, slot: slot as Gear })}>
      <Dropdown.Toggle variant="outline-dark">Apply</Dropdown.Toggle>

      <Dropdown.Menu>
        {GEAR_TYPES.map((gear) => (
          <Dropdown.Item disabled={!canApplyGemValue[gear]} eventKey={gear} key={gear}>
            {capitalizeAll(gear)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
