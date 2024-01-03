import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY, LABEL_NO_PENALTY, LABEL_SEPARATOR } from "@neverquest/data/general";
import { NUDIST_DODGE_BONUS } from "@neverquest/data/traits";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { dodgeChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isUnarmored } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function DodgeChance() {
  const armorValue = useRecoilValue(armor);
  const attributePowerBonusAgility = useRecoilValue(attributePowerBonus("agility"));
  const agility = useRecoilValue(attributeStatistic("agility"));
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const isShowingDodgeChance = useRecoilValue(isShowing("dodgeChance"));
  const isSkillAcquiredEvasion = useRecoilValue(isSkillAcquired("evasion"));
  const isTraitAcquiredNudist = useRecoilValue(isTraitAcquired("nudist"));
  const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"));

  const { burden } = armorValue;

  useDeltaText({
    delta: "dodgeChance",
    format: "percentage",
    state: dodgeChance,
  });

  if (isShowingDodgeChance) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconDodge}
        tooltip="Dodge chance"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Dodge chance details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay Icon={IconAgility} iconProps={{ className: "small" }}>
                          <span>Agility:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <span>
                            {formatNumber({
                              format: "percentage",
                              value: agility,
                            })}
                          </span>

                          {attributePowerBonusAgility > 0 && (
                            <>
                              {LABEL_SEPARATOR}

                              <IconDisplay
                                Icon={IconTomeOfPower}
                                iconProps={{ className: "small" }}
                              >
                                <span>
                                  {formatNumber({
                                    format: "multiplier",
                                    value: attributePowerBonusAgility,
                                  })}
                                </span>
                              </IconDisplay>
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    {isTraitAcquiredNudist && isUnarmored(armorValue) && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconNudist} iconProps={{ className: "small" }}>
                            <span>Nudist:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <span>x{NUDIST_DODGE_BONUS}</span>
                        </td>
                      </tr>
                    )}

                    {burden > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
                            <span>On dodge:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          {isTraitAcquiredStalwart ? (
                            <IconDisplay Icon={IconStalwart} iconProps={{ className: "small" }}>
                              <span>{LABEL_NO_PENALTY}</span>
                            </IconDisplay>
                          ) : (
                            <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                              <span>-{formatNumber({ value: burden })}</span>
                            </IconDisplay>
                          )}
                        </td>
                      </tr>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>
              {isSkillAcquiredEvasion
                ? formatNumber({ format: "percentage", value: dodgeChanceValue })
                : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <DeltasDisplay delta="dodgeChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
