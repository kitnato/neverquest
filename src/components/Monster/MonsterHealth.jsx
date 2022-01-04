import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/hospital-cross.svg";
import {
  currentHealthMonster,
  deltaHealthMonster,
  maxHealthMonster,
} from "state/monster";

export default function MonsterHealth() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster health" />

      <ResourceMeter
        resourceCurrent={currentHealthMonster}
        resourceDelta={deltaHealthMonster}
        resourceMax={maxHealthMonster}
      />
    </Stack>
  );
}
