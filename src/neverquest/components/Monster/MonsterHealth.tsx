import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import icon from "neverquest/icons/hospital-cross.svg";
import {
  currentHealthMonster,
  deltaHealthMonster,
  maximumHealthMonster,
} from "neverquest/state/monster";

export default function MonsterHealth() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster health" />

      <Stack>
        <ResourceMeter
          resourceCurrent={currentHealthMonster}
          resourceDelta={deltaHealthMonster}
          resourceMaximum={maximumHealthMonster}
        />
      </Stack>
    </Stack>
  );
}
