import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { NO_WEAPON } from "@neverquest/constants/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  getDamagePerSecond,
} from "@neverquest/utilities/helpers";

export default function WeaponName({ weapon }: { weapon: Weapon }) {
  const showDPSValue = useRecoilValue(isShowing(ShowingType.DamagePerSecond));

  const { damage, name, rate, staminaCost, type, weaponClass, weight } = weapon;

  const WeaponType = () => (
    <tr>
      <td className="fst-italic text-end">Type:</td>

      <td>{capitalizeAll(type)}</td>
    </tr>
  );

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="fst-italic text-end">Damage:</td>

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
                  <td className="fst-italic text-end">Attack rate:</td>

                  <td>{formatMilliseconds(rate)}</td>
                </tr>

                {weapon !== NO_WEAPON ? (
                  <>
                    <tr>
                      <td className="fst-italic text-end">Stamina cost:</td>

                      <td>{staminaCost}</td>
                    </tr>

                    <WeaponType />

                    <tr>
                      <td className="fst-italic text-end">Class:</td>

                      <td>{weaponClass}</td>
                    </tr>

                    <tr>
                      <td className="fst-italic text-end">Weight:</td>

                      <td>{weight}</td>
                    </tr>
                  </>
                ) : (
                  <WeaponType />
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
