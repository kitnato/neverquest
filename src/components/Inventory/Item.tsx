import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import { Item as ItemType } from "@neverquest/types/core";

export default function Item({ item }: { item: ItemType }) {
  const { description, icon, name } = item;

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Item" />

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
