import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_NO_PENALTY } from "@neverquest/data/general";
import { NUDIST } from "@neverquest/data/traits";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { attributeStatistic } from "@neverquest/state/attributes";
import { armor } from "@neverquest/state/gear";
import { dodgeChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isUnarmored } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function DodgeChance() {
  const armorValue = useRecoilValue(armor);
  const agility = useRecoilValue(attributeStatistic("agility"));
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const isTraitAcquiredNudist = useRecoilValue(isTraitAcquired("nudist"));
  const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"));

  const { burden } = armorValue;

  useDeltaText({
    delta: "dodgeChance",
    format: "percentage",
    state: dodgeChance,
  });

  if (dodgeChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconDodgeChance}
        tooltip="Dodge chance"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
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
                          <span>×{NUDIST.dodgeBonus}</span>
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
            <span>{formatNumber({ format: "percentage", value: dodgeChanceValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="dodgeChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
