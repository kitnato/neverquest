import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { deltas } from "@neverquest/state/deltas";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { dodge, dodgeTotal, powerBonus, rawAttributeStatistic } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { staminaCost } = useRecoilValue(armor);
  const dodgeValue = useRecoilValue(dodge);
  const dodgeTotalValue = useRecoilValue(dodgeTotal);
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const powerBonusValue = useRecoilValue(powerBonus("agility"));
  const statisticValue = useRecoilValue(rawAttributeStatistic("agility"));
  const skillEvasion = useRecoilValue(skills("evasion"));

  useDeltaText({
    atomDelta: deltas("dodge"),
    atomValue: dodgeTotal,
    type: "percentage",
  });

  if (!isShowingDodge) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Dodge details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Agility attribute:</td>

                      <td>{`${formatPercentage(statisticValue)} dodge chance`}</td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                          <td>{`+${formatPercentage(powerBonusValue, 0)}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total agility:</td>

                          <td>{`${formatPercentage(dodgeValue)} dodge chance`}</td>
                        </tr>
                      </>
                    )}

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
            trigger={isShowingDodgePenalty && skillEvasion ? ["hover", "focus"] : []}
          >
            <span>{skillEvasion ? formatPercentage(dodgeTotalValue) : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="dodge" />
        </Stack>
      }
      Icon={IconDodge}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
