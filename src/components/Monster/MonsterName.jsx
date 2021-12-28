import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import attackingIcon from "icons/carnivore-mouth.svg";
import lurkingIcon from "icons/mouth-watering.svg";
import { isAttacking } from "state/character";

export default function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  // TODO - SLIM
  const name = "???";

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon
        icon={isAttackingValue ? attackingIcon : lurkingIcon}
        tooltip="Monster"
      />

      <span>{name}</span>
    </Stack>
  );
}
