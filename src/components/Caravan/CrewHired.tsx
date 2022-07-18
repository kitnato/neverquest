import { MouseEvent } from "react";
import { useAtomValue } from "jotai";
import { Button, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { CrewType } from "@neverquest/types/core";
import { UIVariant } from "@neverquest/types/ui";
import { CREW_MEMBERS } from "@neverquest/utilities/constants-caravan";

export default function CrewHirable({
  setActive,
  type,
}: {
  setActive: () => void;
  type: CrewType;
}) {
  const crewValue = useAtomValue(crew);
  const { interaction, monologues, name } = CREW_MEMBERS[type];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <span>{`"${monologues[crewValue[type].monologueProgress]}"`}</span>

      <Button
        onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
          currentTarget.blur();

          setActive();
        }}
        variant={UIVariant.Outline}
      >
        {interaction}
      </Button>
    </Stack>
  );
}
