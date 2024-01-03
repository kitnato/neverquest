import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY, LABEL_NO_PENALTY } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconProtection from "@neverquest/icons/protection.svg?react";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconTank from "@neverquest/icons/tank.svg?react";
import { armor, shield } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { protection } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { Shield } from "@neverquest/types";
import { isUnshielded } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Protection() {
  const armorValue = useRecoilValue(armor);
  const isShowingProtection = useRecoilValue(isShowing("protection"));
  const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"));
  const isTraitAcquiredTank = useRecoilValue(isTraitAcquired("tank"));
  const protectionValue = useRecoilValue(protection);
  const shieldValue = useRecoilValue(shield);
  const resetQuestProgressProtection = useResetRecoilState(questProgress("protection"));

  const progressQuest = useProgressQuest();

  const { burden, protection: armorProtection } = armorValue;

  useDeltaText({
    delta: "protection",
    state: protection,
  });

  useEffect(() => {
    resetQuestProgressProtection();
    progressQuest({ amount: protectionValue, quest: "protection" });
  }, [progressQuest, protectionValue, resetQuestProgressProtection]);

  if (isShowingProtection) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconProtection}
        tooltip="Total protection"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Protection details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Armor:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconArmor} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ value: armorProtection })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    {isTraitAcquiredTank && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconTank} iconProps={{ className: "small" }}>
                            <span>Tank:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          {isUnshielded(shieldValue) ? (
                            <span>{LABEL_EMPTY}</span>
                          ) : (
                            <span>
                              +
                              {formatNumber({
                                format: "percentage",
                                value: (shieldValue as Shield).block,
                              })}
                            </span>
                          )}
                        </td>
                      </tr>
                    )}

                    {burden > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
                            <span>When damaged:</span>
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
            trigger={burden > 0 || isTraitAcquiredTank ? ["focus", "hover"] : []}
          >
            <span>{formatNumber({ value: protectionValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="protection" />
        </Stack>
      </IconDisplay>
    );
  }
}
