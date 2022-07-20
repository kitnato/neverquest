import { nanoid } from "nanoid";
import { Fragment, useMemo } from "react";
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

export default function AttributesList() {
  const attributesOrder = useMemo(
    () => [
      { atom: health, key: nanoid() },
      { atom: healthRegenerationRate, key: nanoid() },
      { atom: stamina, key: nanoid() },
      { atom: staminaRegenerationRate, key: nanoid() },
      { atom: damage, key: nanoid() },
      { atom: attackRateBonus, key: nanoid() },
      { atom: dodgeChance, key: nanoid() },
      { atom: criticalChance, key: nanoid() },
      { atom: criticalDamage, key: nanoid() },
      { atom: recoveryRate, key: nanoid() },
      { atom: lootBonus, key: nanoid() },
    ],
    []
  );

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
