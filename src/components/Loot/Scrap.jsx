import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/shattered-sword.svg";

export default function Scrap({ tooltip, value }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip || "Scrap"} />

      <span>{value}</span>
    </Stack>
  );
}
