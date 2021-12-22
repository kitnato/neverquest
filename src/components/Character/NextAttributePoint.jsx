import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import NextAttributePointMeter from "components/Character/NextAttributePointMeter";
import icon from "icons/next-button.svg";

export default function NextAttributePoint() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Next available attribute point" />

      <NextAttributePointMeter />
    </Stack>
  );
}
