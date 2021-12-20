import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/shattered-sword.svg";

export default function Scrap({ value }) {
  if (!value) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Scrap" />

      <span>{value}</span>
    </Stack>
  );
}
