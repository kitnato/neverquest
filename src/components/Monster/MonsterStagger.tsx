import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import MonsterStaggerMeter from "@neverquest/components/Monster/MonsterStaggerMeter";
import { ReactComponent as Icon } from "@neverquest/icons/star-swirl.svg";
import { totalStaggerRate } from "@neverquest/state/statistics";

export default function () {
  const totalStaggerRateValue = useRecoilValue(totalStaggerRate);

  if (totalStaggerRateValue === 0) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Staggered duration" />

      <MonsterStaggerMeter />
    </Stack>
  );
}
