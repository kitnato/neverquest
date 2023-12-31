import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
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
          <Stack direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <PopoverHeader className="text-center">
                    <span>Stamina details</span>
                  </PopoverHeader>

                  <PopoverBody>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <span>Base:</span>
                        </td>

                        <td>
                          <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                            <span>{baseAmount}</span>
                          </IconDisplay>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <IconDisplay Icon={IconEndurance} iconProps={{ className: "small" }}>
                            <span>Endurance:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                              <span>
                                +
                                {formatNumber({
                                  value: attributeStatisticEndurance - baseAmount,
                                })}
                              </span>
                            </IconDisplay>

                            {attributePowerBonusEndurance > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconTomeOfPower}
                                  iconProps={{ className: "small" }}
                                >
                                  <span>
                                    {formatNumber({
                                      format: "multiplier",
                                      value: attributePowerBonusEndurance,
                                    })}
                                  </span>
                                </IconDisplay>
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>

                      {questsBonusStamina > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <span>Quest bonus:</span>
                          </td>

                          <td>
                            <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                              <span>
                                +
                                {formatNumber({
                                  decimals: 0,
                                  format: "percentage",
                                  value: questsBonusStamina,
                                })}
                              </span>
                            </IconDisplay>
                          </td>
                        </tr>
                      )}
                    </DetailsTable>
                  </PopoverBody>
                </Popover>
              }
              placement="right"
              trigger={isShowingStaminaDetails ? ["focus", "hover"] : []}
            >
              <div className="w-100">
                <ReserveMeter reserve="stamina" />
              </div>
            </OverlayTrigger>

            <DeltasDisplay delta="stamina" />
          </Stack>

          <Regeneration reserve="stamina" />
        </Stack>
      </IconDisplay>
    );
  }
}
