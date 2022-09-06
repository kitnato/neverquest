import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { NO_WEAPON, WEAPON_CLASS_ICONS } from "@neverquest/constants/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  getDamagePerSecond,
} from "@neverquest/utilities/helpers";
import { hasKnapsack } from "@neverquest/state/character";
import { showWeaponClass } from "@neverquest/state/skills";

export default function ({ weapon }: { weapon: Weapon }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const showDPSValue = useRecoilValue(isShowing(ShowingType.DamagePerSecond));
  const showWeaponClassValue = useRecoilValue(showWeaponClass);

  const { damage, name, rate, staminaCost, weaponClass, weight } = weapon;
  const Icon = WEAPON_CLASS_ICONS[weaponClass];
  const italicClass = "fst-italic text-end";

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className={italicClass}>Damage:</td>

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
                  <td className={italicClass}>Attack rate:</td>

                  <td>{formatMilliseconds(rate)}</td>
                </tr>

                {weapon !== NO_WEAPON && (
                  <>
                    <tr>
                      <td className={italicClass}>Stamina cost:</td>

                      <td>{staminaCost}</td>
                    </tr>

                    {showWeaponClassValue && (
                      <tr>
                        <td className={italicClass}>Class:</td>

                        <td>
                          <Icon width={16} />
                          &nbsp;{capitalizeAll(weaponClass)}
                        </td>
                      </tr>
                    )}

                    {hasKnapsackValue && (
                      <tr>
                        <td className={italicClass}>Weight:</td>

                        <td>{weight}</td>
                      </tr>
                    )}
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
