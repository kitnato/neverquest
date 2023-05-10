import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DodgePenalty } from "@neverquest/components/Inventory/Armor/DodgePenalty";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingGearLevel } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Armor } from "@neverquest/types";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({
  armor,
  placement = "top",
}: {
  armor: Armor | typeof ARMOR_NONE;
  placement?: Placement;
}) {
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const isShowingGearLevelValue = useRecoilValue(isShowingGearLevel);

  const { deflectionChance, level, name, protection, staminaCost, weight } = armor;

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
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>{protection}</td>
              </tr>

              <tr>
                {isShowingGearDetails ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      {(() => {
                        if ("gearClass" in armor) {
                          const { gearClass } = armor;

                          if (gearClass) {
                            const { Icon } = ARMOR_SPECIFICATIONS[gearClass];

                            return (
                              <>
                                <Icon className="inlay" />
                                &nbsp;{capitalizeAll(gearClass)}
                              </>
                            );
                          }
                        }

                        return "None";
                      })()}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {deflectionChance > 0 && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                  <td>{formatPercentage(deflectionChance)}</td>
                </tr>
              )}

              {staminaCost > 0 &&
                (dodgeSkill ? (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Dodge penalty:</td>

                    <td>
                      <DodgePenalty staminaCost={staminaCost} />
                    </td>
                  </tr>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                ))}

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
