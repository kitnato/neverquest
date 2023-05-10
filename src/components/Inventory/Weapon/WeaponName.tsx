import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond, isShowingGearLevel } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  placement = "top",
  weapon,
}: {
  placement?: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const isShowingGearLevelValue = useRecoilValue(isShowingGearLevel);
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { abilityName, Icon, skillType } = WEAPON_SPECIFICATIONS[gearClass];

  const skillValue = useRecoilValue(skills(skillType));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              {isShowingGearLevelValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

                  <td>{level}</td>
                </tr>
              )}

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>{`${damage}${
                  isShowingDamagePerSecondValue
                    ? ` (${getDamagePerRate({
                        damage,
                        rate,
                      })} DPS)`
                    : ""
                }`}</td>
              </tr>

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>{formatMilliseconds(rate)}</td>
              </tr>

              <tr>
                {isShowingStamina ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

                    <td>{staminaCost}</td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <tr>
                {isShowingGearDetails ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <Icon className="inlay" />
                      &nbsp;{capitalizeAll(gearClass)}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {skillValue ? (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>{abilityName} chance:</td>

                  <td>{formatPercentage(abilityChance)}</td>
                </tr>
              ) : (
                <tr>
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                </tr>
              )}

              <tr>
                {hasKnapsackValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                    <td>{weight}</td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
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
