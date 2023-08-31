import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGemsShield } from "@neverquest/components/Items/AppliedGemsShield";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Items/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Items/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import { type SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/none.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/shield-stagger.svg";
import { shield as shieldEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import type { Shield } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ShieldName({
  placement,
  shield,
}: {
  placement?: Placement;
  shield: Shield | typeof SHIELD_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const isShowingStagger = useRecoilValue(isShowing("stagger"));
  const shieldEquippedValue = useRecoilValue(shieldEquipped);

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
                    ? { showingType: "shield", subtrahend: shieldEquippedValue.level }
                    : null
                }
                level={level}
              />

              <AppliedGemsShield />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>
                  <IconImage Icon={IconBlock} size="tiny" />
                  &nbsp;{formatPercentage(block)}
                  {showComparison && (
                    <GearComparison
                      difference={block - shieldEquippedValue.block}
                      showingType="shield"
                    />
                  )}
                </td>
              </tr>

              <StaminaCostDetail
                comparison={
                  showComparison
                    ? {
                        showingType: "shield",
                        subtrahend: shieldEquippedValue.staminaCost,
                      }
                    : null
                }
                cost={staminaCost}
              />

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

              <tr>
                {isShowingStagger ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance:</td>

                    <td>
                      <IconImage Icon={IconStagger} size="tiny" />
                      &nbsp;{formatPercentage(stagger)}
                      {showComparison && (
                        <GearComparison
                          difference={stagger - shieldEquippedValue.stagger}
                          showingType="shield"
                        />
                      )}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <WeightDetail
                comparison={
                  showComparison
                    ? { showingType: "shield", subtrahend: shieldEquippedValue.weight }
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
