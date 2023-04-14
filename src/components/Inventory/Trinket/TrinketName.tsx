import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import type { Trinket } from "@neverquest/types";

export function TrinketName({
  placement = "top",
  trinket,
}: {
  placement?: Placement;
  trinket: Trinket;
}) {
  const { description, name, weight } = trinket;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body className="text-center">
            <span>{description}</span>

            <DetailsTable>
              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                <td>{weight}</td>
              </tr>
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
