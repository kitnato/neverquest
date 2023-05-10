import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingGearLevel } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Shield } from "@neverquest/types";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ShieldName({
  placement = "top",
  shield,
}: {
  placement?: Placement;
  shield: Shield | typeof SHIELD_NONE;
}) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const isShowingGearLevelValue = useRecoilValue(isShowingGearLevel);
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));
  const staggerSkillValue = useRecoilValue(skills(SkillType.Stagger));

  const { blockChance, level, name, staggerChance, staminaCost, weight } = shield;

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
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>{formatPercentage(blockChance)}</td>
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
                    <td className={CLASS_TABLE_CELL_ITALIC}>Size:</td>

                    <td>
                      {(() => {
                        if ("size" in shield) {
                          const { size } = shield;

                          if (size) {
                            const { Icon } = SHIELD_SPECIFICATIONS[size];

                            return (
                              <>
                                <Icon className="inlay" />
                                &nbsp;{capitalizeAll(size)}
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

              <tr>
                {staggerSkillValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance:</td>

                    <td>{formatPercentage(staggerChance)}</td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

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
