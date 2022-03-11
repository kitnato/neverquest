import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/two-coins.svg";

export default function Coins({ tooltip, value }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip || "Coins"} />

      <span>{value}</span>
    </Stack>
  );
}
