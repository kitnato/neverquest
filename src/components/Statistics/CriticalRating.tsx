import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconCriticalChance } from "@neverquest/icons/critical-chance.svg";
import { ReactComponent as IconCriticalDamage } from "@neverquest/icons/critical-damage.svg";
import { ReactComponent as IconCriticalRating } from "@neverquest/icons/critical-rating.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconDexterity } from "@neverquest/icons/dexterity.svg";
import { ReactComponent as IconPerception } from "@neverquest/icons/perception.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { criticalRating, criticalStrike } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

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
    stop: () => !assassinationValue,
    value: criticalRating,
  });

  if (!isShowingCriticalRating) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Critical rating details</Popover.Header>

                <Popover.Body>
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

                          {`${formatValue({
                            decimals: 0,
                            format: "percentage",
                            value: dexterity,
                          })} chance`}

                          {dexterityPowerBonus > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} size="small" />

                              {`+${formatValue({
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

                          {`${formatValue({
                            decimals: 0,
                            format: "percentage",
                            value: perception,
                          })} damage`}

                          {perceptionPowerBonus > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} size="small" />

                              {`+${formatValue({
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

                          {formatValue({ value: criticalStrikeValue })}
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={assassinationValue ? ["hover", "focus"] : []}
          >
            <span>{assassinationValue ? criticalRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="criticalRating" />
        </Stack>
      }
      Icon={IconCriticalRating}
      isAnimated
      tooltip="Critical rating"
    />
  );
}
