import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
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
import { criticalRating, criticalStrike } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CriticalRating() {
  const dexterityPowerBonus = useRecoilValue(attributePowerBonus("dexterity"));
  const perceptionPowerBonus = useRecoilValue(attributePowerBonus("perception"));
  const dexterity = useRecoilValue(attributeStatistic("dexterity"));
  const perception = useRecoilValue(attributeStatistic("perception"));
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalStrikeValue = useRecoilValue(criticalStrike);
  const isShowingCriticalRating = useRecoilValue(isShowing("criticalRating"));
  const assassinationValue = useRecoilValue(isSkillAcquired("assassination"));

  useDeltaText({
    delta: "criticalRating",
    state: criticalRating,
    stop: () => !assassinationValue,
  });

  if (!isShowingCriticalRating) {
    return null;
  }

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
                        <IconImage Icon={IconDexterity} size="small" />
                        Dexterity:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconCriticalChance} size="small" />

                        {`${formatNumber({
                          decimals: 0,
                          format: "percentage",
                          value: dexterity,
                        })} chance`}

                        {dexterityPowerBonus > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} size="small" />

                            {`+${formatNumber({
                              format: "percentage",
                              value: dexterityPowerBonus,
                            })}`}
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconPerception} size="small" />
                        Perception:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconCriticalDamage} size="small" />

                        {`${formatNumber({
                          decimals: 0,
                          format: "percentage",
                          value: perception,
                        })} damage`}

                        {perceptionPowerBonus > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} size="small" />

                            {`+${formatNumber({
                              format: "percentage",
                              value: perceptionPowerBonus,
                            })}`}
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Critical damage:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconDamage} size="small" />

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

        <FloatingTextQueue delta="criticalRating" />
      </Stack>
    </IconDisplay>
  );
}
