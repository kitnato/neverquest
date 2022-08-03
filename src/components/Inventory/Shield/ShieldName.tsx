import { OverlayTrigger, Popover, Table } from "react-bootstrap";

import { NO_SHIELD } from "@neverquest/constants/gear";
import { Shield } from "@neverquest/types";
import { capitalizeAll, formatMilliseconds, formatPercentage } from "@neverquest/utilities/helpers";

export default function ShieldName({ shield }: { shield: Shield }) {
  const { block, name, stagger, staminaCost, type, weight } = shield;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="fst-italic text-end">Block chance:</td>

                  <td>{formatPercentage(block)}</td>
                </tr>

                <tr>
                  <td className="fst-italic text-end">Stagger duration:</td>

                  <td>{formatMilliseconds(stagger)}</td>
                </tr>

                {shield !== NO_SHIELD && (
                  <>
                    <tr>
                      <td className="fst-italic text-end">Stamina price:</td>

                      <td>{staminaCost}</td>
                    </tr>

                    <tr>
                      <td className="fst-italic text-end">Type:</td>

                      <td>{capitalizeAll(type)}</td>
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
