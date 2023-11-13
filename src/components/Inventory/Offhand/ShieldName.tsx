import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
import { SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import IconBlock from "@neverquest/icons/block.svg?react";
import IconNone from "@neverquest/icons/none.svg?react";
import IconStagger from "@neverquest/icons/stagger.svg?react";
import { shield as shieldEquipped } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Shield } from "@neverquest/types";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ShieldName({
  placement,
  shield,
}: {
  placement?: Placement;
  shield: Shield | typeof SHIELD_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const shieldEquippedValue = useRecoilValue(shieldEquipped);
  const shieldcraftSkill = useRecoilValue(isSkillAcquired("shieldcraft"));

  const { block, ID, level, name, stagger, staminaCost, weight } = shield;
  const showComparison = ID !== shieldEquippedValue.ID;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">{name}</PopoverHeader>

          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison
                    ? { showing: "offhand", subtrahend: shieldEquippedValue.level }
                    : undefined
                }
                level={level}
              />

              <AppliedGems gearItem={shield} />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconBlock} size="small" />

                    {formatNumber({ format: "percentage", value: block })}

                    {showComparison && (
                      <GearComparison
                        difference={block - shieldEquippedValue.block}
                        showing="offhand"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              <StaminaCostDetail
                comparison={
                  showComparison
                    ? {
                        showing: "offhand",
                        subtrahend: shieldEquippedValue.staminaCost,
                      }
                    : undefined
                }
                cost={staminaCost}
              />

              {level !== 0 && (
                <tr>
                  {isShowingGearClass ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                      <td>
                        {(() => {
                          const { gearClass } = shield;

                          if (gearClass) {
                            const { Icon } = SHIELD_SPECIFICATIONS[gearClass];

                            return (
                              <Stack direction="horizontal" gap={1}>
                                <IconImage Icon={Icon} size="small" />

                                {capitalizeAll(gearClass)}
                              </Stack>
                            );
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
              )}

              {stagger > 0 && (
                <tr>
                  {shieldcraftSkill ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStagger} size="small" />

                          {formatNumber({ format: "percentage", value: stagger })}

                          {showComparison && (
                            <GearComparison
                              difference={stagger - shieldEquippedValue.stagger}
                              showing="offhand"
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

              {shield.name !== SHIELD_NONE.name && (
                <WeightDetail
                  comparison={
                    showComparison
                      ? { showing: "offhand", subtrahend: shieldEquippedValue.weight }
                      : undefined
                  }
                  weight={weight}
                />
              )}
            </DetailsTable>
          </PopoverBody>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
