import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";

import { Armor } from "neverquest/env";

export default function ArmorName({ armor }: { armor: Armor }) {
  const { encumbrance, name, protection, weight } = armor;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="text-end">Protection:</td>

                  <td>{protection}</td>
                </tr>

                {encumbrance > 0 && weight && (
                  <tr>
                    <td className="text-end">Weight:</td>

                    <td>
                      {weight} ({encumbrance})
                    </td>
                  </tr>
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
