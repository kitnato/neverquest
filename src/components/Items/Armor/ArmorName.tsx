import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Items/AppliedGems";
import { DodgePenaltyContents } from "@neverquest/components/Items/Armor/DodgePenaltyContents";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Items/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/none.svg";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { armor as armorEquipped } from "@neverquest/state/items";
import { skills } from "@neverquest/state/skills";
import type { Armor } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";

export function ArmorName({
  armor,
  placement,
}: {
  armor: Armor | typeof ARMOR_NONE;
  placement?: Placement;
}) {
  const armorEquippedValue = useRecoilValue(armorEquipped);
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const armorcraftValue = useRecoilValue(skills("armorcraft"));

  const { deflection, level, name, protection, staminaCost, weight } = armor;
  const showComparison = armorEquippedValue.id !== armor.id;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison ? { showing: "armor", subtrahend: armorEquippedValue.level } : null
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconProtection} size="small" />

                    {formatValue({ value: protection })}

                    {showComparison && (
                      <GearComparison
                        difference={protection - armorEquippedValue.protection}
                        showing="armor"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              <AppliedGems gearItem={armor} />

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
                              <Stack direction="horizontal" gap={1}>
                                <IconImage Icon={Icon} size="small" />

                                {capitalizeAll(gearClass)}
                              </Stack>
                            );
                          }
                        }

                        return (
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconNone} size="small" />
                            None
                          </Stack>
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
                  {armorcraftValue ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDeflection} size="small" />

                          {formatValue({ format: "percentage", value: deflection })}

                          {showComparison && (
                            <GearComparison
                              difference={deflection - armorEquippedValue.deflection}
                              showing="armor"
                            />
                          )}
                        </Stack>
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              {staminaCost > 0 && (
                <tr>
                  {isShowingDodgePenalty ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Dodge penalty:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <DodgePenaltyContents staminaCost={staminaCost} />

                          {showComparison && (
                            <GearComparison
                              difference={staminaCost - armorEquippedValue.staminaCost}
                              isDownPositive
                              showing="armor"
                            />
                          )}
                        </Stack>
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              <WeightDetail
                comparison={
                  showComparison
                    ? { showing: "armor", subtrahend: armorEquippedValue.weight }
                    : null
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
