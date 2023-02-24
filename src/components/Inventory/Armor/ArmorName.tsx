import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, ICON_INLAY_SIZE, LABEL_UNKNOWN } from "@neverquest/constants";
import { ARMOR_ICONS, ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { Armor } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({ armor }: { armor: Armor }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const armorsSkillValue = useRecoilValue(skills(SkillType.Armors));

  const { armorClass, deflectionChance, name, penalty, protection, staminaCost, weight } = armor;
  const Icon = armorClass ? ARMOR_ICONS[armorClass] : () => null;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
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

                  {deflectionChance && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>{formatPercentage(deflectionChance)}</td>
                    </tr>
                  )}

                  {staminaCost && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost when dodging:</td>

                      <td>{staminaCost}</td>
                    </tr>
                  )}

                  {penalty && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Penalty to dodge chance:</td>

                      <td>{formatPercentage(penalty)}</td>
                    </tr>
                  )}
                </>
              ) : (
                <tr>
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                </tr>
              )}

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
      placement="top"
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
