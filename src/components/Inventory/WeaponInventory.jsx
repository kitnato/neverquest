import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/axe-sword.svg";
import { getDamagePerSecond } from "utilities/helpers";

export default function WeaponInventory({ separateName, weapon }) {
  const { damage, name, rate, staminaCost, type } = weapon;

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
            {`Damage: ${damage.minimum}-${damage.maximum} (${getDamagePerSecond(
              {
                range: damage,
                rate,
              }
            )} DPS)`}
            <br />
            {`Stamina cost: ${staminaCost}`}
            <br />
            {`Type: ${type}`}
          </>
        }
      />

      {separateName && <span>{name}</span>}
    </Stack>
  );
}
