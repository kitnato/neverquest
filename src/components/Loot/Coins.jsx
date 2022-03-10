import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/two-coins.svg";

export default function Coins({ value }) {
  // TODO - showValue for coins
  if (!value) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Coins" />

      <span>{value}</span>
    </Stack>
  );
}
