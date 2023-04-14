import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, ICON_SIZE_INLAY, LABEL_UNKNOWN } from "@neverquest/constants";
import { WEAPON_ABILITY_NAME, WEAPON_CLASS_ICONS, WEAPON_SKILL_TYPE } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
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
  weapon: Weapon;
}) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));
  const isShowingGearClassAndTypes = useRecoilValue(isShowing(ShowingType.GearClassAndTypes));

  const { abilityChance, artifactClass, damage, name, rate, staminaCost, weight } = weapon;
  const Icon = WEAPON_CLASS_ICONS[artifactClass];

  const skillValue = useRecoilValue(skills(WEAPON_SKILL_TYPE[artifactClass]));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
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
                {isShowingGearClassAndTypes ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <Icon width={ICON_SIZE_INLAY} />
                      &nbsp;{capitalizeAll(artifactClass)}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {skillValue ? (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    {WEAPON_ABILITY_NAME[artifactClass]} chance:
                  </td>

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
