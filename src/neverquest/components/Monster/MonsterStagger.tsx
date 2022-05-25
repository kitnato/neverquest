import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import MonsterStaggerMeter from "neverquest/components/Monster/MonsterStaggerMeter";
import icon from "neverquest/icons/star-swirl.svg";
import { totalStaggerRate } from "neverquest/state/statistics";

export default function MonsterStagger() {
  const totalStaggerRateValue = useAtomValue(totalStaggerRate);

  if (totalStaggerRateValue === 0) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Staggered" />

      <MonsterStaggerMeter />
    </Stack>
  );
}
