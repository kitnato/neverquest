import { Fragment } from "react";
import Stack from "react-bootstrap/Stack";

import Attribute from "neverquest/components/Attributes/Attribute";
import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenerationRate,
  lootBonus,
  physicalResistance,
  recoveryRate,
  stamina,
  staminaRegenerationRate,
} from "neverquest/state/attributes";

const attributesOrder = [
  health,
  healthRegenerationRate,
  stamina,
  staminaRegenerationRate,
  damage,
  attackRateBonus,
  dodgeChance,
  criticalChance,
  criticalDamage,
  recoveryRate,
  physicalResistance,
  lootBonus,
];

export default function AttributesList() {
  return (
    <Stack gap={3}>
      {attributesOrder.map((attribute) => (
        <Fragment key={attribute.key}>
          <Attribute atom={attribute} />
        </Fragment>
      ))}
    </Stack>
  );
}
