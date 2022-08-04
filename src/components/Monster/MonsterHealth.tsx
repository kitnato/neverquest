import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import FloatingText from "@neverquest/components/FloatingText";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/hospital-cross.svg";
import { deltas } from "@neverquest/state/deltas";
import { currentHealthMonster, maximumHealthMonster } from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";

export default function MonsterHealth() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Monster health" />

      <Stack className="w-100" direction="horizontal">
        <ReserveMeter atom={currentHealthMonster} atomMaximum={maximumHealthMonster} />

        <FloatingText atom={deltas(DeltaType.HealthMonster)} />
      </Stack>
    </Stack>
  );
}
