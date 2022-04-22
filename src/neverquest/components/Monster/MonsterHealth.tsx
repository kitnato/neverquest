import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import FloatingText from "neverquest/components/FloatingText";
import ResourceMeter from "neverquest/components/ResourceMeter";
import icon from "neverquest/icons/hospital-cross.svg";
import { deltaHealthMonster } from "neverquest/state/deltas";
import { currentHealthMonster, maximumHealthMonster } from "neverquest/state/monster";

export default function MonsterHealth() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster health" />

      <Stack className="align-self-center w-100" direction="horizontal">
        <ResourceMeter atom={currentHealthMonster} atomMaximum={maximumHealthMonster} />

        <FloatingText atom={deltaHealthMonster} />
      </Stack>
    </Stack>
  );
}
