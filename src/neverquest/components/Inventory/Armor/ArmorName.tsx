import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";

import { Armor } from "neverquest/env";

export default function ArmorName({ armor }: { armor: Armor }) {
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
                  <td className="text-end">Protection:</td>

                  <td>{protection}</td>
                </tr>

                {armorClass && (
                  <tr>
                    <td className="text-end">Class:</td>

                    <td>{armorClass}</td>
                  </tr>
                )}

                {weight > 0 && (
                  <tr>
                    <td className="text-end">Weight:</td>

                    <td>{weight}</td>
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
