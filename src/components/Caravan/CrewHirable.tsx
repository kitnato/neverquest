import { MouseEvent } from "react";
import { Button, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/cowled.svg";
import { CrewType } from "@neverquest/types/core";
import { UIVariant } from "@neverquest/types/ui";
import { CREW_MEMBERS } from "@neverquest/utilities/constants-caravan";

export default function CrewHirable({ type }: { type: CrewType }) {
  const { description, name } = CREW_MEMBERS[type];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <div className="align-items-center d-flex justify-content-between w-100">
        <span>{description}</span>

        <Button
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            // TODO
          }}
          variant={UIVariant.Outline}
        >
          Hire
        </Button>
      </div>
    </Stack>
  );
}
