import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconCriticalChance } from "@neverquest/icons/critical-chance.svg";
import { ReactComponent as IconCriticalDamage } from "@neverquest/icons/critical-damage.svg";
import { ReactComponent as IconCriticalRating } from "@neverquest/icons/critical-rating.svg";
import { ReactComponent as IconDexterity } from "@neverquest/icons/dexterity.svg";
import { ReactComponent as IconPerception } from "@neverquest/icons/perception.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import {
  criticalChance,
  criticalDamage,
  criticalRating,
  criticalStrike,
  powerBonus,
} from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function CriticalRating() {
  const criticalChanceValue = useRecoilValue(criticalChance);
  const criticalDamageValue = useRecoilValue(criticalDamage);
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalStrikeValue = useRecoilValue(criticalStrike);
  const isShowingCriticalRating = useRecoilValue(isShowing("criticalRating"));
  const powerBonusChanceValue = useRecoilValue(powerBonus("dexterity"));
  const powerBonusDamageValue = useRecoilValue(powerBonus("perception"));
  const assassinationValue = useRecoilValue(skills("assassination"));
  const dexterityValue = useRecoilValue(attributeStatistic("dexterity"));
  const perceptionValue = useRecoilValue(attributeStatistic("perception"));

  useDeltaText({
    delta: deltas("criticalRating"),
    stop: ({ previous }) => previous === null || !assassinationValue,
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
                        <IconImage Icon={IconDexterity} size="tiny" />
                        &nbsp;Dexterity:
                      </td>

                      <td>
                        <IconImage Icon={IconCriticalChance} size="tiny" />
                        &nbsp;
                        {`${formatValue({
                          decimals: 0,
                          format: "percentage",
                          value: dexterityValue,
                        })} chance`}
                      </td>
                    </tr>

                    {powerBonusChanceValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatValue({
                            format: "percentage",
                            value: powerBonusChanceValue,
                          })}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total chance:</td>

                          <td>
                            <IconImage Icon={IconCriticalChance} size="tiny" />
                            &nbsp;
                            {formatValue({ format: "percentage", value: criticalChanceValue })}
                          </td>
                        </tr>
                      </>
                    )}

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconPerception} size="tiny" />
                        &nbsp;Perception:
                      </td>

                      <td>
                        <IconImage Icon={IconCriticalDamage} size="tiny" />
                        &nbsp;
                        {`${formatValue({
                          decimals: 0,
                          format: "percentage",
                          value: perceptionValue,
                        })} damage`}
                        &nbsp;
                        {`(${criticalStrikeValue})`}
                      </td>
                    </tr>

                    {powerBonusDamageValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatValue({
                            format: "percentage",
                            value: powerBonusDamageValue,
                          })}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total damage:</td>

                          <td>
                            <IconImage Icon={IconCriticalDamage} size="tiny" />
                            &nbsp;
                            {formatValue({ format: "percentage", value: criticalDamageValue })}
                          </td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={assassinationValue ? ["hover", "focus"] : []}
          >
            <span>{assassinationValue ? criticalRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="criticalRating" />
        </Stack>
      }
      Icon={IconCriticalRating}
      isAnimated
      tooltip="Critical rating"
    />
  );
}
