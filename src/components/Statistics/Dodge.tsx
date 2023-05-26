import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { deltas } from "@neverquest/state/deltas";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { dodge, dodgeTotal } from "@neverquest/state/statistics";
import { Attribute, Delta, Showing, Skill } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { staminaCost } = useRecoilValue(armor);
  const dodgeValue = useRecoilValue(dodge);
  const dodgeTotalValue = useRecoilValue(dodgeTotal);
  const isShowingDodgeDetails = useRecoilValue(isShowing(Showing.DodgeDetails));
  const dodgeSkill = useRecoilValue(skills(Skill.Evasion));

  const { name } = ATTRIBUTES[Attribute.Agility];
  const deltaDodge = deltas(Delta.Dodge);

  useDeltaText({
    atomDelta: deltaDodge,
    atomValue: dodgeTotal,
  });

  if (!dodgeSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Dodge details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                      <td>{`${formatPercentage(dodgeValue)} dodge chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Armor penalty:</td>

                      <td>
                        <DodgePenaltyContents staminaCost={staminaCost} />
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingDodgeDetails ? ["hover", "focus"] : []}
          >
            <span>{formatPercentage(dodgeTotalValue)}</span>
          </OverlayTrigger>

          <FloatingText type={Delta.Dodge} />
        </>
      }
      Icon={IconDodge}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
