import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";

import { Weapon } from "neverquest/env.d";
import { showDamagePerSecond } from "neverquest/state/show";
import { capitalizeAll, getDamagePerSecond } from "neverquest/utilities/helpers";

export default function WeaponName({ weapon }: { weapon: Weapon }) {
  const showDPSValue = useRecoilValue(showDamagePerSecond);
  const { damage, name, rate, staminaCost, type, weight } = weapon;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="text-end">Damage:</td>

                  <td>{`${damage}${
                    showDPSValue
                      ? ` (${getDamagePerSecond({
                          damage,
                          rate,
                        })} DPS)`
                      : ""
                  }`}</td>
                </tr>

                <tr>
                  <td className="text-end">Stamina cost:</td>

                  <td>{staminaCost}</td>
                </tr>

                <tr>
                  <td className="text-end">Type:</td>

                  <td>{capitalizeAll(type)}</td>
                </tr>

                <tr>
                  <td className="text-end">Weight:</td>

                  <td>{capitalizeAll(weight)}</td>
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
  );
}
