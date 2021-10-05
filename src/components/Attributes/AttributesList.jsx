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
  recoveryRate,
  stamina,
  staminaRegenAmount,
  staminaRegenRate,
} from "state/attributes";

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
  recoveryRate,
  criticalChance,
  criticalDamage,
  lootBonus,
];

export default function AttributesList() {
  return (
    <Container>
      <div className="justify-content-center spaced-vertical">
        {attributesOrder.map((attribute) => (
          <Attribute atom={attribute} />
        ))}
      </div>
    </Container>
  );
}
