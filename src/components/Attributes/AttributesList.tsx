import { Fragment } from "react";
import Stack from "react-bootstrap/Stack";

import Attribute from "@neverquest/components/Attributes/Attribute";
import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenerationRate,
  lootBonus,
  recoveryRate,
  stamina,
  staminaRegenerationRate,
} from "@neverquest/state/attributes";

const attributesOrder = [
  { atom: health, key: "health" },
  { atom: healthRegenerationRate, key: "healthRegenerationRate" },
  { atom: stamina, key: "stamina" },
  { atom: staminaRegenerationRate, key: "staminaRegenerationRate" },
  { atom: damage, key: "damage" },
  { atom: attackRateBonus, key: "attackRateBonus" },
  { atom: dodgeChance, key: "dodgeChance" },
  { atom: criticalChance, key: "criticalChance" },
  { atom: criticalDamage, key: "criticalDamage" },
  { atom: recoveryRate, key: "recoveryRate" },
  { atom: lootBonus, key: "lootBonus" },
];

export default function AttributesList() {
  return (
    <Stack gap={3}>
      {attributesOrder.map(({ atom, key }) => (
        <Fragment key={key}>
          <Attribute atom={atom} />
        </Fragment>
      ))}
    </Stack>
  );
}
