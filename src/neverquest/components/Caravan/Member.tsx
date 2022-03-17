import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/cowled.svg";

export default function Member({
  label,
  name,
  setActive,
}: {
  name: string;
  label: string;
  setActive: () => void;
}) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <Button onClick={setActive} variant={UIVariant.Outline}>
        {label}
      </Button>
    </Stack>
  );
}
