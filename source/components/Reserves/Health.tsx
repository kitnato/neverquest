import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { questsBonus } from "@neverquest/state/quests";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Health() {
  const attributePowerBonusVitality = useRecoilValue(attributePowerBonus("vitality"));
  const attributeStatisticVitality = useRecoilValue(attributeStatistic("vitality"));
  const isShowingHealth = useRecoilValue(isShowing("health"));
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const questsBonusHealth = useRecoilValue(questsBonus("healthBonus"));
  const setPoisonDuration = useSetRecoilState(poisonDuration);

  const { baseAmount } = RESERVES.health;

  useTimerDelta({
    delta: setPoisonDuration,
    stop: !isPoisonedValue,
  });

  if (isShowingHealth) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconHealth}
        tooltip="Health"
      >
        <Stack>
          <Stack direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <PopoverHeader className="text-center">
                    <span>Health details</span>
                  </PopoverHeader>

                  <PopoverBody>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <span>Base:</span>
                        </td>

                        <td>
                          <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                            <span>{baseAmount}</span>
                          </IconDisplay>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <IconDisplay Icon={IconVitality} iconProps={{ className: "small" }}>
                            <span>Vitality:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                              <span>
                                +
                                {formatNumber({
                                  value: attributeStatisticVitality - baseAmount,
                                })}
                              </span>
                            </IconDisplay>

                            {attributePowerBonusVitality > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconTomeOfPower}
                                  iconProps={{ className: "small" }}
                                >
                                  <span>
                                    {formatNumber({
                                      format: "multiplier",
                                      value: attributePowerBonusVitality,
                                    })}
                                  </span>
                                </IconDisplay>
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>

                      {questsBonusHealth > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <span>Quest bonus:</span>
                          </td>

                          <td>
                            <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                              <span>
                                +
                                {formatNumber({
                                  decimals: 0,
                                  format: "percentage",
                                  value: questsBonusHealth,
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
              trigger={isShowingHealthDetails ? ["focus", "hover"] : []}
            >
              <div className="w-100">
                <ReserveMeter reserve="health" />
              </div>
            </OverlayTrigger>

            <DeltasDisplay delta="health" />
          </Stack>

          <Regeneration reserve="health" />
        </Stack>
      </IconDisplay>
    );
  }
}
