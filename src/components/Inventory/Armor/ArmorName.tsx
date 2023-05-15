import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DodgePenaltyDetail } from "@neverquest/components/Inventory/DodgePenaltyDetail";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { isShowing } from "@neverquest/state/isShowing";
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
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));

  const { deflectionChance, level, name, protection, staminaCost, weight } = armor;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail level={level} />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>
                  <IconProtection className="inlay" />
                  &nbsp;{protection}
                </td>
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

                  <td>
                    <IconDeflection className="inlay" />
                    &nbsp;{formatPercentage(deflectionChance)}
                  </td>
                </tr>
              )}

              {staminaCost > 0 &&
                (dodgeSkill ? (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Dodge penalty:</td>

                    <td>
                      <DodgePenaltyDetail staminaCost={staminaCost} />
                    </td>
                  </tr>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                ))}

              <WeightDetail weight={weight} />
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
