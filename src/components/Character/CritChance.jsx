import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/spiky-eclipse.svg";
import { show } from "state/global";
import { totalCriticalChance } from "state/stats";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const showValue = useRecoilValue(show);

  if (!showValue.critical) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{criticalChanceValue * 100}%</span>
    </Stack>
  );
}
