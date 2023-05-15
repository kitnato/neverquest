import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { ReactComponent as IconBlockChance } from "@neverquest/icons/block-chance.svg";
import { ReactComponent as IconStaggerChance } from "@neverquest/icons/shield-stagger.svg";
import { isShowing } from "@neverquest/state/isShowing";
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
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const staggerSkillValue = useRecoilValue(skills(SkillType.Stagger));

  const { blockChance, level, name, staggerChance, staminaCost, weight } = shield;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail level={level} />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>
                  <IconBlockChance className="inlay" />
                  &nbsp;{formatPercentage(blockChance)}
                </td>
              </tr>

              <StaminaCostDetail cost={staminaCost} />

              <tr>
                {isShowingGearDetails ? (
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

              <tr>
                {staggerSkillValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance:</td>

                    <td>
                      <IconStaggerChance className="inlay" />
                      &nbsp;{formatPercentage(staggerChance)}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

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
