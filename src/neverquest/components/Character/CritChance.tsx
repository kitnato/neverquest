import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/spiky-eclipse.svg";
import { showCritical } from "neverquest/state/show";
import { totalCriticalChance } from "neverquest/state/stats";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const showCriticalValue = useRecoilValue(showCritical);

  if (!showCriticalValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{criticalChanceValue * 100}%</span>
    </Stack>
  );
}
