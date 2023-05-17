import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import type { Trinket } from "@neverquest/types";

export function TrinketName({ placement, trinket }: { placement?: Placement; trinket: Trinket }) {
  const { description, name, weight } = trinket;

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
