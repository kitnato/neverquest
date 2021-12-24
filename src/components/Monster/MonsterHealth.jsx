import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/hospital-cross.svg";
import { currentHealthMonster, maxHealthMonster } from "state/monster";

export default function MonsterHealth() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster health" />

      <ResourceMeter
        resourceCurrent={currentHealthMonster}
        resourceMax={maxHealthMonster}
      />
    </Stack>
  );
}
