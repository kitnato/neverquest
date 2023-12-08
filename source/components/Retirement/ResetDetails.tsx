import { ListGroup, ListGroupItem, Stack } from "react-bootstrap";
import { IconImage } from "@neverquest/components/IconImage";
import IconAttributes from "@neverquest/icons/attributes.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconGear from "@neverquest/icons/gear.svg?react";
import IconMasteries from "@neverquest/icons/masteries.svg?react";
import IconSkills from "@neverquest/icons/skills.svg?react";
import IconStage from "@neverquest/icons/stage.svg?react";

export function ResetDetails() {
  return (
    <Stack gap={3}>
      <h6>Starting from scratch</h6>

      <ListGroup>
        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconStage} isSmall />
            Stage
          </Stack>
        </ListGroupItem>

        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconEssence} isSmall />
            Essence
          </Stack>
        </ListGroupItem>

        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconAttributes} isSmall />
            Attributes
          </Stack>
        </ListGroupItem>

        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconSkills} isSmall />
            Skills
          </Stack>
        </ListGroupItem>

        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconMasteries} isSmall />
            Masteries
          </Stack>
        </ListGroupItem>

        <ListGroupItem>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconGear} isSmall />
            Gear
          </Stack>
        </ListGroupItem>
      </ListGroup>
    </Stack>
  );
}
