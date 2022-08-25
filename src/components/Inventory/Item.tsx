import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import { Item as ItemType } from "@neverquest/types";

export default function ({ item }: { item: ItemType }) {
  const { description, Icon, name } = item;

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Item" />

      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Header className="text-center">{name}</Popover.Header>

            <Popover.Body>
              <span className="fst-italic">{description}</span>
            </Popover.Body>
          </Popover>
        }
        placement="top"
      >
        <span>{name}</span>
      </OverlayTrigger>
    </Stack>
  );
}
