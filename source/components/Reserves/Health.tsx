import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
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
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const questsBonusHealth = useRecoilValue(questsBonus("healthBonus"));
  const setPoison = useSetRecoilState(poisonDuration);

  const { baseAmount } = RESERVES.health;
  const vitalityBonus = attributeStatisticVitality - baseAmount;

  useTimerDelta({
    delta: setPoison,
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
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Base:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                          <span>{baseAmount}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    {vitalityBonus > 0 && (
                      <tr>
                        <td>
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
                                  value: vitalityBonus,
                                })}
                              </span>
                            </IconDisplay>

                            {attributePowerBonusVitality > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconEldritchCodex}
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
                    )}

                    {questsBonusHealth > 0 && (
                      <tr>
                        <td>
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
            trigger={
              attributePowerBonusVitality > 0 || questsBonusHealth > 0 || vitalityBonus > 0
                ? POPOVER_TRIGGER
                : []
            }
          >
            <div className="w-100">
              <ReserveMeter reserve="health" />
            </div>
          </OverlayTrigger>

          <Regeneration reserve="health" />
        </Stack>
      </IconDisplay>
    );
  }
}
