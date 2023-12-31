import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_SEPARATOR,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { NUDIST_DODGE_BONUS } from "@neverquest/data/traits";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconDodgePenalty from "@neverquest/icons/dodge-penalty.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor } from "@neverquest/state/gear";
import { ownedItem } from "@neverquest/state/inventory";
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
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isSkillAcquiredEvasion = useRecoilValue(isSkillAcquired("evasion"));
  const isTraitAcquiredNudist = useRecoilValue(isTraitAcquired("nudist"));
  const ownedItemTomeOfPower = useRecoilValue(ownedItem("tome of power"));

  const { staminaCost } = armorValue;

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
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconAgility} />

                          <span>Agility:</span>
                        </Stack>
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

                              <IconImage className="small" Icon={IconTomeOfPower} />

                              <span>
                                {formatNumber({
                                  format: "multiplier",
                                  value: attributePowerBonusAgility,
                                })}
                              </span>
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    {isTraitAcquiredNudist && isUnarmored(armorValue) && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage className="small" Icon={IconNudist} />

                            <span>Nudist:</span>
                          </Stack>
                        </td>

                        <td>
                          <span>x{NUDIST_DODGE_BONUS}</span>
                        </td>
                      </tr>
                    )}

                    {isShowingDodgePenalty ? (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage className="small" Icon={IconDodgePenalty} />

                            <span>Armor penalty:</span>
                          </Stack>
                        </td>

                        <td>
                          <DodgePenaltyContents staminaCost={staminaCost} />
                        </td>
                      </tr>
                    ) : (
                      <td className="text-end">
                        <span>{LABEL_UNKNOWN}</span>
                      </td>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={
              isSkillAcquiredEvasion &&
              (isShowingDodgePenalty || ownedItemTomeOfPower !== undefined)
                ? ["focus", "hover"]
                : []
            }
          >
            <span>
              {isSkillAcquiredEvasion && staminaCost !== Number.POSITIVE_INFINITY
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
