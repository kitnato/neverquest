import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Items/Armor/DodgePenaltyContents";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAgility } from "@neverquest/icons/agility.svg";
import { ReactComponent as IconDodgePenalty } from "@neverquest/icons/dodge-penalty.svg";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { armor, ownedItem } from "@neverquest/state/items";
import { skills } from "@neverquest/state/skills";
import { dodge, powerBonus } from "@neverquest/state/statistics";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_UNKNOWN,
} from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { staminaCost } = useRecoilValue(armor);
  const dodgeValue = useRecoilValue(dodge);
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));
  const powerBonusValue = useRecoilValue(powerBonus("agility"));
  const statisticValue = useRecoilValue(attributeStatistic("agility"));
  const evasionValue = useRecoilValue(skills("evasion"));

  useDeltaText({
    delta: deltas("dodge"),
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
                <Popover.Header className="text-center">Dodge chance details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconAgility} size="small" />
                          Agility:
                        </Stack>
                      </td>

                      <td>{`${formatValue({
                        decimals: 0,
                        format: "percentage",
                        value: statisticValue,
                      })}`}</td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconPower} size="small" />
                            Empowered:
                          </Stack>
                        </td>

                        <td>{`+${formatValue({
                          format: "percentage",
                          value: powerBonusValue,
                        })}`}</td>
                      </tr>
                    )}

                    {isShowingDodgePenalty ? (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Armor penalty:</td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconDodgePenalty} size="small" />

                            <DodgePenaltyContents staminaCost={staminaCost} />
                          </Stack>
                        </td>
                      </tr>
                    ) : (
                      <td className="text-end">{LABEL_UNKNOWN}</td>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={
              evasionValue && (isShowingDodgePenalty || hasTomeOfPower) ? ["hover", "focus"] : []
            }
          >
            <span>
              {evasionValue
                ? formatValue({ format: "percentage", value: dodgeValue })
                : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <FloatingText delta="dodge" />
        </Stack>
      }
      Icon={IconDodge}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
