import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/constants";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { Shield } from "@neverquest/types";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ShieldName({ shield }: { shield: Shield }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));
  const shieldSkillValue = useRecoilValue(skills(SkillType.Shields));
  const staggerSkillValue = useRecoilValue(skills(SkillType.Stagger));

  const { blockChance, name, staggerChance, staminaCost, type, weight } = shield;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
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
                  {shieldSkillValue ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Type:</td>

                      <td>{capitalizeAll(type)}</td>
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
              </tbody>
            </Table>
          </Popover.Body>
        </Popover>
      }
      placement="top"
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
