import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/barbute.svg";
import { totalArmor } from "neverquest/state/stats";

export default function TotalArmor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total armor" />

      <span>{totalArmorValue}</span>
    </Stack>
  );
}
