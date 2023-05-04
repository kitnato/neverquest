import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import {
  CLASS_TABLE_CELL_ITALIC,
  ICON_NO_ARMOR,
  ICON_SIZE_INLAY,
  LABEL_UNKNOWN,
} from "@neverquest/constants";
import { ARMOR_SPECIFICATIONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import type { Armor } from "@neverquest/types";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({ armor, placement = "top" }: { armor: Armor; placement?: Placement }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const armorsSkillValue = useRecoilValue(skills(SkillType.Armors));

  const {
    deflectionChance,
    dodgeChanceModifier,
    gearClass,
    name,
    protection,
    staminaCost,
    weight,
  } = armor;

  const { Icon } = gearClass ? ARMOR_SPECIFICATIONS[gearClass] : { Icon: ICON_NO_ARMOR };

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

              <tr>
                {isShowingGearDetails ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <Icon width={ICON_SIZE_INLAY} />
                      &nbsp;
                      {capitalizeAll(gearClass ?? "None")}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <tr>
                {armorsSkillValue ? (
                  <>
                    {deflectionChance && (
                      <>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                        <td>{formatPercentage(deflectionChance)}</td>
                      </>
                    )}

                    {staminaCost && (
                      <>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost when dodging:</td>

                        <td>{staminaCost}</td>
                      </>
                    )}

                    {dodgeChanceModifier && (
                      <>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Penalty to dodge chance:</td>

                        <td>{formatPercentage(dodgeChanceModifier)}</td>
                      </>
                    )}
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
