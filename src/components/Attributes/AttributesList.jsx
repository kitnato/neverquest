import Stack from "react-bootstrap/Stack";

import Attribute from "components/Attributes/Attribute";
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
} from "state/attributes";
import React from "react";

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
        <React.Fragment key={attribute.key}>
          <Attribute atom={attribute} />
        </React.Fragment>
      ))}
    </Stack>
  );
}
