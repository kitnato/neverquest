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
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import {
  criticalChance,
  criticalDamage,
  criticalRating,
  powerBonus,
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
  const dexterityValue = useRecoilValue(rawAttributeStatistic("dexterity"));
  const perceptionValue = useRecoilValue(rawAttributeStatistic("perception"));

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
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconDexterity} size="tiny" />
                        &nbsp;Dexterity:
                      </td>

                      <td>
                        <IconImage Icon={IconCriticalChance} size="tiny" />
                        &nbsp;{`${formatPercentage(dexterityValue, 0)} chance`}
                      </td>
                    </tr>

                    {powerBonusChanceValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatPercentage(powerBonusChanceValue)}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total chance:</td>

                          <td>
                            <IconImage Icon={IconCriticalChance} size="tiny" />
                            &nbsp;{formatPercentage(criticalChanceValue)}
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
                        &nbsp;{`${formatPercentage(perceptionValue, 0)} damage`}
                      </td>
                    </tr>

                    {powerBonusDamageValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatPercentage(powerBonusDamageValue)}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total damage:</td>

                          <td>
                            <IconImage Icon={IconCriticalDamage} size="tiny" />
                            &nbsp;{formatPercentage(criticalDamageValue)}
                          </td>
                        </tr>
                      </>
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
