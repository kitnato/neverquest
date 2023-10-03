import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Items/AppliedGems";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Items/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Items/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import { SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/none.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/stagger.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { shield as shieldEquipped } from "@neverquest/state/items";
import { skills } from "@neverquest/state/skills";
import type { Shield } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";

export function ShieldName({
  placement,
  shield,
}: {
  placement?: Placement;
  shield: Shield | typeof SHIELD_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const shieldEquippedValue = useRecoilValue(shieldEquipped);
  const shieldcraftSkill = useRecoilValue(skills("shieldcraft"));

  const { block, level, name, stagger, staminaCost, weight } = shield;
  const showComparison = shieldEquippedValue.id !== shield.id;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison
                    ? { showing: "offhand", subtrahend: shieldEquippedValue.level }
                    : null
                }
                level={level}
              />

              <AppliedGems gearItem={shield} />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconBlock} size="small" />

                    {formatValue({ format: "percentage", value: block })}

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
                    : null
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
                          if ("gearClass" in shield) {
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

                          {formatValue({ format: "percentage", value: stagger })}

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
                      : null
                  }
                  weight={weight}
                />
              )}
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
