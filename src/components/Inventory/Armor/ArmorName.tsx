import { OverlayTrigger, Popover, Table } from "react-bootstrap";

import { NO_ARMOR } from "@neverquest/constants/gear";
import { Armor } from "@neverquest/types";

export default function ({ armor }: { armor: Armor }) {
  const { armorClass, name, protection, weight } = armor;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="fst-italic text-end">Protection:</td>

                  <td>{protection}</td>
                </tr>

                {armor !== NO_ARMOR && (
                  <>
                    <tr>
                      <td className="fst-italic text-end">Class:</td>

                      <td>{armorClass}</td>
                    </tr>

                    <tr>
                      <td className="fst-italic text-end">Weight:</td>

                      <td>{weight}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Popover.Body>
        </Popover>
      }
      placement="top"
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
