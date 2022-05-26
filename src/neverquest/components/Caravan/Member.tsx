import { useAtomValue } from "jotai";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/cowled.svg";
import { crewMonologues } from "neverquest/state/caravan";
import { CrewType } from "neverquest/types/core";
import { UIVariant } from "neverquest/types/ui";

export default function Member({
  label,
  name,
  setActive,
  type,
}: {
  label: string;
  name: string;
  setActive: () => void;
  type: CrewType;
}) {
  const crewMonologueValue = useAtomValue(crewMonologues);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <span>{`"${crewMonologueValue[type]}"`}</span>

      <Button onClick={setActive} variant={UIVariant.Outline}>
        {label}
      </Button>
    </Stack>
  );
}
