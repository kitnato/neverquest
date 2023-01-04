import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC, ICON_INLAY_SIZE, UNKNOWN } from "@neverquest/constants";
import { ARMOR_ICONS, ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { Armor } from "@neverquest/types";
import { ArmorClass, SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export default function ({ armor }: { armor: Armor }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const armorsSkillValue = useRecoilValue(skills(SkillType.Armors));

  const { armorClass, deflection, name, penalty, protection, weight } = armor;
  const Icon = armorClass ? ARMOR_ICONS[armorClass] : () => null;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                  <td>{protection}</td>
                </tr>

                {armorsSkillValue ? (
                  <>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                      <td>
                        <Icon width={ICON_INLAY_SIZE} />
                        &nbsp;
                        {capitalizeAll(armorClass ? ARMOR_SPECIFICATIONS[armorClass].name : "None")}
                      </td>
                    </tr>

                    {deflection && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance</td>

                        <td>{formatPercentage(deflection)}</td>
                      </tr>
                    )}

                    {penalty && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{`Penalty to ${
                          armorClass === ArmorClass.Reinforced
                            ? "dodge chance"
                            : "dodge chance & attack rate"
                        }:`}</td>

                        <td>{formatPercentage(penalty)}</td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr>
                    <td className="text-end">{UNKNOWN}</td>
                  </tr>
                )}

                <tr>
                  {hasKnapsackValue ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                      <td>{weight}</td>
                    </>
                  ) : (
                    <td className="text-end">{UNKNOWN}</td>
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
