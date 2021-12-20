import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/cowled.svg";

export default function Member({ label, name, setActive }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <Button onClick={setActive} variant="outline-dark">
        {label}
      </Button>
    </Stack>
  );
}
