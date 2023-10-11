import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_SEPARATOR,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAgility } from "@neverquest/icons/agility.svg";
import { ReactComponent as IconDodgePenalty } from "@neverquest/icons/dodge-penalty.svg";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { ownedItem } from "@neverquest/state/items";
import { isSkillAcquired } from "@neverquest/state/skills";
import { dodge } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { staminaCost } = useRecoilValue(armor);
  const agilityPowerBonus = useRecoilValue(attributePowerBonus("agility"));
  const agility = useRecoilValue(attributeStatistic("agility"));
  const dodgeValue = useRecoilValue(dodge);
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isSkillAcquiredEvasion = useRecoilValue(isSkillAcquired("evasion"));
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));

  useDeltaText({
    delta: "dodge",
    format: "percentage",
    value: dodge,
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
                <PopoverHeader className="text-center">Dodge chance details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconAgility} size="small" />
                          Agility:
                        </Stack>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          {`${formatValue({
                            decimals: 0,
                            format: "percentage",
                            value: agility,
                          })}`}

                          {agilityPowerBonus > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} size="small" />

                              {`+${formatValue({
                                format: "percentage",
                                value: agilityPowerBonus,
                              })}`}
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    {isShowingDodgePenalty ? (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconDodgePenalty} size="small" />
                            Armor penalty:
                          </Stack>
                        </td>

                        <td>
                          <DodgePenaltyContents staminaCost={staminaCost} />
                        </td>
                      </tr>
                    ) : (
                      <td className="text-end">{LABEL_UNKNOWN}</td>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={
              isSkillAcquiredEvasion && (isShowingDodgePenalty || hasTomeOfPower)
                ? ["hover", "focus"]
                : []
            }
          >
            <span>
              {isSkillAcquiredEvasion
                ? formatValue({ format: "percentage", value: dodgeValue })
                : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <FloatingTextQueue delta="dodge" />
        </Stack>
      }
      Icon={IconDodge}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
