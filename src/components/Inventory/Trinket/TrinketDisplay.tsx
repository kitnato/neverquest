import { OverlayTrigger, Popover, Table } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { Trinket } from "@neverquest/types";

export function TrinketDisplay({ trinket }: { trinket: Trinket }) {
  const { description, Icon, name, weight } = trinket;

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">{name}</Popover.Header>

              <Popover.Body className="text-center">
                <span className="fst-italic">{description}</span>

                <Table borderless size="sm" style={{ margin: 0 }}>
                  <tbody>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                      <td>{weight}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{name}</span>
        </OverlayTrigger>
      }
      Icon={Icon}
      tooltip="Trinket"
    />
  );
}
