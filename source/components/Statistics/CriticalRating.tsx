import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { criticalChance, criticalRating, criticalStrike } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CriticalRating() {
  const attributePowerBonusDexterity = useRecoilValue(attributePowerBonus("dexterity"));
  const attributePowerBonusPerception = useRecoilValue(attributePowerBonus("perception"));
  const attributeStatisticDexterity = useRecoilValue(attributeStatistic("dexterity"));
  const attributeStatisticPerception = useRecoilValue(attributeStatistic("perception"));
  const criticalChanceValue = useRecoilValue(criticalChance);
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalStrikeValue = useRecoilValue(criticalStrike);

  useDeltaText({
    delta: "criticalRating",
    state: criticalRating,
  });

  if (criticalRatingValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconCriticalRating}
        tooltip="Critical rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay Icon={IconDexterity} iconProps={{ className: "small" }}>
                          <span>Dexterity:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <Stack gap={1}>
                          <IconDisplay Icon={IconCriticalChance} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: attributeStatisticDexterity,
                              })}
                              &nbsp;chance on&nbsp;
                            </span>

                            <IconImage className="small" Icon={IconAttackRate} />
                          </IconDisplay>

                          {attributePowerBonusDexterity > 0 && (
                            <IconDisplay
                              Icon={IconEldritchCodex}
                              iconProps={{ className: "small" }}
                            >
                              <span>
                                {formatNumber({
                                  format: "multiplier",
                                  value: attributePowerBonusDexterity,
                                })}
                              </span>
                            </IconDisplay>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <IconDisplay Icon={IconPerception} iconProps={{ className: "small" }}>
                          <span>Perception:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <Stack gap={1}>
                          <IconDisplay Icon={IconCriticalDamage} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: attributeStatisticPerception,
                              })}
                              &nbsp;of&nbsp;
                            </span>

                            <IconImage className="small" Icon={IconDamage} />
                          </IconDisplay>

                          {attributePowerBonusPerception > 0 && (
                            <IconDisplay
                              Icon={IconEldritchCodex}
                              iconProps={{ className: "small" }}
                            >
                              <span>
                                {formatNumber({
                                  format: "multiplier",
                                  value: attributePowerBonusPerception,
                                })}
                              </span>
                            </IconDisplay>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>Critical strike:</span>
                      </td>

                      <td>
                        {criticalChanceValue !== attributeStatisticDexterity && (
                          <span>
                            {formatNumber({ format: "percentage", value: criticalChanceValue })}
                            &nbsp;chance for&nbsp;
                          </span>
                        )}

                        <span>{formatNumber({ value: criticalStrikeValue })}&nbsp;damage</span>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ value: criticalRatingValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="criticalRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
