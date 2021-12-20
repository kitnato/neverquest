import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import coinsIcon from "icons/two-coins.svg";

export default function Coins({ value }) {
  if (!value) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={coinsIcon} tooltip="Coins" />

      <span>{value}</span>
    </Stack>
  );
}
