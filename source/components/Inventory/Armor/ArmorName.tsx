import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconNone from "@neverquest/icons/none.svg?react";
import IconProtection from "@neverquest/icons/protection.svg?react";
import { armor as armorEquipped } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import type { Armor } from "@neverquest/types";
import { isUnarmored } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ArmorName({
  armor,
  overlayPlacement,
}: {
  armor: Armor | typeof ARMOR_NONE;
  overlayPlacement: Placement;
}) {
  const armorEquippedValue = useRecoilValue(armorEquipped);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));

  const { deflection, ID, level, name, protection, staminaCost, weight } = armor;
  const isArmorUnarmored = isUnarmored(armor);
  const showComparison = ID !== armorEquippedValue.ID;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">
            <span>{name}</span>
          </PopoverHeader>

          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison && { showing: "armor", subtrahend: armorEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>
                  <span>Protection:</span>
                </td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage className="small" Icon={IconProtection} />

                    <span>{formatNumber({ value: protection })}</span>

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

              {!isArmorUnarmored && (
                <tr>
                  {isShowingGearClass ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Class:</span>
                      </td>

                      <td>
                        {(() => {
                          if (isUnarmored(armor)) {
                            return (
                              <Stack direction="horizontal" gap={1}>
                                <IconImage className="small" Icon={IconNone} />

                                <span>None</span>
                              </Stack>
                            );
                          }

                          const { gearClass } = armor;
                          const { Icon } = ARMOR_SPECIFICATIONS[gearClass];

                          return (
                            <Stack direction="horizontal" gap={1}>
                              <IconImage className="small" Icon={Icon} />

                              <span>{capitalizeAll(gearClass)}</span>
                            </Stack>
                          );
                        })()}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">
                      <span>{LABEL_UNKNOWN}</span>
                    </td>
                  )}
                </tr>
              )}

              {deflection > 0 && (
                <tr>
                  {isShowingDeflection ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Deflection chance:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconDeflection} />

                          <span>{formatNumber({ format: "percentage", value: deflection })}</span>

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
                    <td className="text-end">
                      <span>{LABEL_UNKNOWN}</span>
                    </td>
                  )}
                </tr>
              )}

              {staminaCost > 0 && (
                <tr>
                  {isShowingDodgePenalty ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Dodge penalty:</span>
                      </td>

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
                    <td className="text-end">
                      <span>{LABEL_UNKNOWN}</span>
                    </td>
                  )}
                </tr>
              )}

              {!isArmorUnarmored && (
                <WeightDetail
                  comparison={
                    showComparison && { showing: "armor", subtrahend: armorEquippedValue.weight }
                  }
                  weight={weight}
                />
              )}
            </DetailsTable>
          </PopoverBody>
        </Popover>
      }
      placement={overlayPlacement}
    >
      <span>{name}&nbsp;</span>
    </OverlayTrigger>
  );
}
