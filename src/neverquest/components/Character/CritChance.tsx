import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/spiky-eclipse.svg";
import { show } from "neverquest/state/global";
import { totalCriticalChance } from "neverquest/state/stats";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const { critical } = useRecoilValue(show);

  if (!critical) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{criticalChanceValue * 100}%</span>
    </Stack>
  );
}