import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/internal";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/gear-class-none.svg";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { armor as armorEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import type { Armor } from "@neverquest/types";
import { Showing, Skill } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({
  armor,
  placement,
}: {
  armor: Armor | typeof ARMOR_NONE;
  placement?: Placement;
}) {
  const armorEquippedValue = useRecoilValue(armorEquipped);
  const isShowingGearClass = useRecoilValue(isShowing(Showing.GearClass));
  const skillArmors = useRecoilValue(skills(Skill.Armorcraft));
  const skillDodge = useRecoilValue(skills(Skill.Evasion));

  const { deflection, level, name, protection, staminaCost, weight } = armor;
  const isEquipped = JSON.stringify(armorEquippedValue) === JSON.stringify(armor);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: Showing.Armor, subtrahend: armorEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>
                  <IconImage Icon={IconProtection} size="tiny" />
                  &nbsp;{protection}
                  {!isEquipped && (
                    <GearComparison
                      difference={protection - armorEquippedValue.protection}
                      showingType={Showing.Armor}
                    />
                  )}
                </td>
              </tr>

              <tr>
                {isShowingGearClass ? (
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
                                <IconImage Icon={Icon} size="tiny" />
                                &nbsp;{capitalizeAll(gearClass)}
                              </>
                            );
                          }
                        }

                        return (
                          <>
                            <IconImage Icon={IconNone} size="tiny" />
                            &nbsp;None
                          </>
                        );
                      })()}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {deflection > 0 && (
                <tr>
                  {skillArmors ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>
                        <IconImage Icon={IconDeflection} size="tiny" />
                        &nbsp;{formatPercentage(deflection)}
                        {!isEquipped && (
                          <GearComparison
                            difference={deflection - armorEquippedValue.deflection}
                            showingType={Showing.Armor}
                          />
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              {staminaCost > 0 && (
                <tr>
                  {skillDodge ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Dodge penalty:</td>

                      <td>
                        <DodgePenaltyContents staminaCost={staminaCost} />

                        {!isEquipped && (
                          <GearComparison
                            difference={staminaCost - armorEquippedValue.staminaCost}
                            isDownPositive
                            showingType={Showing.Armor}
                          />
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              <WeightDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: Showing.Armor, subtrahend: armorEquippedValue.weight }
                }
                weight={weight}
              />
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
