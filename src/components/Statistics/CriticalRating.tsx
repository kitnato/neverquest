import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconCriticalRating } from "@neverquest/icons/critical-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import {
  criticalChance,
  criticalDamage,
  criticalRating,
  powerBonus,
  rawAttributeStatistic,
} from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function CriticalRating() {
  const criticalChanceValue = useRecoilValue(criticalChance);
  const criticalDamageValue = useRecoilValue(criticalDamage);
  const criticalRatingValue = useRecoilValue(criticalRating);
  const isShowingCriticalRating = useRecoilValue(isShowing("criticalRating"));
  const powerBonusChanceValue = useRecoilValue(powerBonus("dexterity"));
  const powerBonusDamageValue = useRecoilValue(powerBonus("perception"));
  const skillAssassination = useRecoilValue(skills("assassination"));
  const statisticChanceValue = useRecoilValue(rawAttributeStatistic("dexterity"));
  const statisticDamageValue = useRecoilValue(rawAttributeStatistic("perception"));

  useDeltaText({
    atomDelta: deltas("criticalRating"),
    atomValue: criticalRating,
    stop: (previous) => previous === null || !skillAssassination,
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
                      <td className={CLASS_TABLE_CELL_ITALIC}>Critical chance:</td>

                      <td>{formatPercentage(criticalChanceValue)}</td>
                    </tr>

                    {powerBonusChanceValue > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                        <td>{`${formatPercentage(statisticChanceValue)} +${formatPercentage(
                          powerBonusChanceValue
                        )}`}</td>
                      </tr>
                    )}

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Critical damage:</td>

                      <td>{formatPercentage(criticalDamageValue)}</td>
                    </tr>

                    {powerBonusDamageValue > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                        <td>{`${formatPercentage(statisticDamageValue)} +${formatPercentage(
                          powerBonusDamageValue
                        )}`}</td>
                      </tr>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillAssassination ? ["hover", "focus"] : []}
          >
            <span>{skillAssassination ? criticalRatingValue : LABEL_EMPTY}</span>
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
