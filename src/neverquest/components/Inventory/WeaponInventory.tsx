import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import { Weapon } from "neverquest/env.d";
import icon from "neverquest/icons/axe-sword.svg";
import { capitalizeAll, getDamagePerSecond } from "neverquest/utilities/helpers";

export default function WeaponInventory({
  separateName,
  weapon,
}: {
  separateName?: boolean;
  weapon: Weapon;
}) {
  const { damage, name, rate, staminaCost, type, weight } = weapon;

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon
        icon={icon}
        tooltip={
          <>
            {!separateName && (
              <>
                {name}
                <br />
              </>
            )}
            {`Damage: ${damage.minimum}-${damage.maximum} (${getDamagePerSecond({
              range: damage,
              rate,
            })} DPS)`}
            <br />
            {`Stamina cost: ${staminaCost}`}
            <br />
            {`Type: ${capitalizeAll(type)}`}
            <br />
            {`Weight: ${capitalizeAll(weight)}`}
          </>
        }
      />

      {separateName && <span>{name}</span>}
    </Stack>
  );
}
