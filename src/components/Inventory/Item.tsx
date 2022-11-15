import { OverlayTrigger, Popover } from "react-bootstrap";

import IconDisplay from "@neverquest/components/IconDisplay";
import { Item } from "@neverquest/types";

export default function ({ item }: { item: Item }) {
  const { description, Icon, name } = item;

  return (
    <IconDisplay
      contents={
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
      }
      Icon={Icon}
      tooltip="Item"
    />
  );
}
