import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/shattered-sword.svg";

export default function Scrap({ tooltip, value }: { tooltip?: string; value: number }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip || "Scrap"} />

      <span>{value}</span>
    </Stack>
  );
}
