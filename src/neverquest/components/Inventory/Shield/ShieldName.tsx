import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";

import { Shield } from "neverquest/env";
import { capitalizeAll, formatMilliseconds, formatPercentage } from "neverquest/utilities/helpers";

export default function ShieldName({ shield }: { shield: Shield }) {
  const { block, encumbrance, name, stagger, type } = shield;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="text-end">Block chance:</td>

                  <td>{formatPercentage(block)}</td>
                </tr>

                <tr>
                  <td className="text-end">Stagger duration:</td>

                  <td>{formatMilliseconds(stagger)}</td>
                </tr>

                {type && (
                  <tr>
                    <td className="text-end">Type:</td>

                    <td>{capitalizeAll(type)}</td>
                  </tr>
                )}

                {encumbrance > 0 && (
                  <tr>
                    <td className="text-end">Weight:</td>

                    <td>{encumbrance}</td>
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
