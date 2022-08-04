import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import MonsterAttackMeter from "@neverquest/components/Monster/MonsterAttackMeter";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";

export default function MonsterAttack() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Monster attack rate" />

      <MonsterAttackMeter />
    </Stack>
  );
}
