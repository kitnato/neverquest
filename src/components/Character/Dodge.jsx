import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/wingfoot.svg";
import { show } from "state/global";
import { totalDodgeChance } from "state/stats";

export default function Dodge() {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const { dodgeChance } = useRecoilValue(show);

  if (!dodgeChance) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Dodge" />

      <span>{dodgeChanceValue * 100}%</span>
    </Stack>
  );
}
