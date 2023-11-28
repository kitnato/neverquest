import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import {
  criticalChance,
  criticalDamage,
  criticalRating,
  criticalStrike,
} from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CriticalRating() {
  const attributePowerBonusDexterity = useRecoilValue(attributePowerBonus("dexterity"));
  const attributePowerBonusPerception = useRecoilValue(attributePowerBonus("perception"));
  const attributeStatisticDexterity = useRecoilValue(attributeStatistic("dexterity"));
  const attributeStatisticPerception = useRecoilValue(attributeStatistic("perception"));
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalChanceValue = useRecoilValue(criticalChance);
  const criticalDamageValue = useRecoilValue(criticalDamage);
  const criticalStrikeValue = useRecoilValue(criticalStrike);
  const isShowingCriticalRating = useRecoilValue(isShowing("criticalRating"));
  const assassinationValue = useRecoilValue(isSkillAcquired("assassination"));

  useDeltaText({
    delta: "criticalRating",
    state: criticalRating,
    stop: () => !assassinationValue,
  });

  if (isShowingCriticalRating) {
    return (
      <IconDisplay Icon={IconCriticalRating} isAnimated tooltip="Critical rating">
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Critical rating details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDexterity} isSmall />
                          Dexterity:
                        </Stack>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconCriticalChance} isSmall />

                          {`${formatNumber({
                            format: "percentage",
                            value: attributeStatisticDexterity,
                          })} chance`}

                          {attributePowerBonusDexterity > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} isSmall />

                              {`+${formatNumber({
                                format: "percentage",
                                value: criticalChanceValue - attributeStatisticDexterity,
                              })}`}
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconPerception} isSmall />
                          Perception:
                        </Stack>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconCriticalDamage} isSmall />

                          {`${formatNumber({
                            decimals: 0,
                            format: "percentage",
                            value: attributeStatisticPerception,
                          })} damage`}

                          {attributePowerBonusPerception > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} isSmall />

                              {`+${formatNumber({
                                format: "percentage",
                                value: criticalDamageValue - attributeStatisticPerception,
                              })}`}
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Critical strike damage:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDamage} isSmall />

                          {formatNumber({ value: criticalStrikeValue })}
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={assassinationValue ? ["hover", "focus"] : []}
          >
            <span>{assassinationValue ? criticalRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="criticalRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
