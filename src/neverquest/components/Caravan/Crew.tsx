import { MouseEvent } from "react";
import { useAtomValue } from "jotai";
import { Button, Stack } from "react-bootstrap";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/cowled.svg";
import { crewMonologues } from "neverquest/state/caravan";
import { level } from "neverquest/state/encounter";
import { CrewType } from "neverquest/types/core";
import { UIVariant } from "neverquest/types/ui";

export default function Crew({
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
  const levelValue = useAtomValue(level);

  const monologues = crewMonologueValue[type];
  const monologue = monologues[levelValue - 1] || monologues[monologues.length - 1];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <span>{`"${monologue}"`}</span>

      <Button
        onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
          currentTarget.blur();

          setActive();
        }}
        variant={UIVariant.Outline}
      >
        {label}
      </Button>
    </Stack>
  );
}
