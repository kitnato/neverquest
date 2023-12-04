import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import IconEndurance from "@neverquest/icons/endurance.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { questsBonus } from "@neverquest/state/quests";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Stamina() {
  const attributePowerBonusEndurance = useRecoilValue(attributePowerBonus("endurance"));
  const attributeStatisticEndurance = useRecoilValue(attributeStatistic("endurance"));
  const isShowingStamina = useRecoilValue(isShowing("stamina"));
  const isShowingStaminaDetails = useRecoilValue(isShowing("staminaDetails"));
  const questsBonusStamina = useRecoilValue(questsBonus("staminaBonus"));

  const { baseAmount } = RESERVES.stamina;

  if (isShowingStamina) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconStamina}
        tooltip="Stamina"
      >
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <PopoverHeader className="text-center">Stamina details</PopoverHeader>

                  <PopoverBody>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconStamina} isSmall />

                            {baseAmount}
                          </Stack>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconEndurance} isSmall />
                            Endurance:
                          </Stack>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconStamina} isSmall />

                            {`+${formatNumber({
                              value: attributeStatisticEndurance - baseAmount,
                            })}`}

                            {attributePowerBonusEndurance > 0 && (
                              <>
                                <span>{LABEL_SEPARATOR}</span>

                                <IconImage Icon={IconTomeOfPower} isSmall />

                                {formatNumber({
                                  format: "multiplier",
                                  value: attributePowerBonusEndurance,
                                })}
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>

                      {questsBonusStamina > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Quest bonus:</td>

                          <td>
                            <Stack direction="horizontal" gap={1}>
                              <IconImage Icon={IconStamina} isSmall />

                              {`+${formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: questsBonusStamina,
                              })}`}
                            </Stack>
                          </td>
                        </tr>
                      )}
                    </DetailsTable>
                  </PopoverBody>
                </Popover>
              }
              placement="right"
              trigger={isShowingStaminaDetails ? ["hover", "focus"] : []}
            >
              <span className="w-100">
                <ReserveMeter reserve="stamina" />
              </span>
            </OverlayTrigger>

            <DeltasDisplay delta="stamina" />
          </Stack>

          <Regeneration reserve="stamina" />
        </Stack>
      </IconDisplay>
    );
  }
}
