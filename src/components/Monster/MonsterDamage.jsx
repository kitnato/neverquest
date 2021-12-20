import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/wolverine-claws.svg";

export default function MonsterDamage({ damagePerHit }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage" />

      <span>
        {damagePerHit.min}-{damagePerHit.max}
      </span>
    </Stack>
  );
}
