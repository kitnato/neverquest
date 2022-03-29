import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/cowled.svg";

export default function Member({
  label,
  name,
  monologue,
  setActive,
}: {
  name: string;
  monologue: string;
  label: string;
  setActive: () => void;
}) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <span>{`"${monologue}"`}</span>

      <Button onClick={setActive} variant={UIVariant.Outline}>
        {label}
      </Button>
    </Stack>
  );
}
