import Container from "react-bootstrap/Container";

import Attribute from "components/Attributes/Attribute";
import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenAmount,
  healthRegenRate,
  lootBonus,
  physicalResistance,
  recoveryRate,
  stamina,
  staminaRegenAmount,
  staminaRegenRate,
} from "state/attributes";
import React from "react";

const attributesOrder = [
  health,
  healthRegenRate,
  healthRegenAmount,
  stamina,
  staminaRegenRate,
  staminaRegenAmount,
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
    <Container>
      <div
        className="spaced-vertical"
        style={{ margin: "auto", width: "fit-content" }}
      >
        {attributesOrder.map((attribute) => (
          <React.Fragment key={attribute.key}>
            <Attribute atom={attribute} />
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
}
