import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wingfoot.svg";
import { showDodgeChance } from "neverquest/state/show";
import { totalDodgeChance } from "neverquest/state/stats";

export default function Dodge() {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const showDodgeChanceValue = useRecoilValue(showDodgeChance);

  if (!showDodgeChanceValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Dodge" />

      <span>{dodgeChanceValue * 100}%</span>
    </Stack>
  );
}
