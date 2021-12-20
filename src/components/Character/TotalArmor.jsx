import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/barbute.svg";
import { totalArmor } from "state/stats";

export default function TotalArmor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total armor" />

      <span>{totalArmorValue}</span>
    </Stack>
  );
}
