import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, TrinketItem } from "@neverquest/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ItemName({
  item,
  placement,
}: {
  item: ConsumableItem | TrinketItem;
  placement?: Placement;
}) {
  const { description, type, weight } = item;
  const name = capitalizeAll(type);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body className="text-center">
            <span>{description}</span>

            <DetailsTable>
              <WeightDetail weight={weight} />
            </DetailsTable>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
