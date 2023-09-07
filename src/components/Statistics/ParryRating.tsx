import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { PARRY_ABSORPTION, PARRY_DAMAGE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFinesse } from "@neverquest/icons/finesse.svg";
import { ReactComponent as IconParryRating } from "@neverquest/icons/parry-rating.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import {
  parryAbsorption,
  parryChance,
  parryDamage,
  parryRating,
} from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function ParryRating() {
  const parryChanceValue = useRecoilValue(parryChance);
  const parryAbsorptionValue = useRecoilValue(parryAbsorption);
  const parryDamageValue = useRecoilValue(parryDamage);
  const parryRatingValue = useRecoilValue(parryRating);
  const isShowingParry = useRecoilValue(isShowing("parry"));
  const finesseValue = useRecoilValue(masteryStatistic("finesse"));
  const skillEscrime = useRecoilValue(skills("escrime"));

  useDeltaText({
    atomDelta: deltas("parry"),
    atomValue: parryRating,
    stop: ({ previous }) => previous === null || !skillEscrime,
  });

  if (!isShowingParry) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Parry rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance on hit:</td>

                      <td>
                        <IconImage Icon={IconParry} size="tiny" />
                        &nbsp;{formatPercentage(parryChanceValue)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage reflected:</td>

                      <td>{formatPercentage(PARRY_DAMAGE, 0)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage absorbed:</td>

                      <td>{formatPercentage(PARRY_ABSORPTION, 0)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconFinesse} size="tiny" />
                        &nbsp;Finesse:
                      </td>

                      <td>{`+${formatPercentage(finesseValue, 0)}`}</td>
                    </tr>

                    {finesseValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total reflected:</td>

                          <td>{formatPercentage(parryDamageValue)}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total absorbed:</td>

                          <td>{formatPercentage(parryAbsorptionValue)}</td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillEscrime ? ["hover", "focus"] : []}
          >
            <span>{skillEscrime ? parryRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="parry" />
        </Stack>
      }
      Icon={IconParryRating}
      isAnimated
      tooltip="Parry rating"
    />
  );
}
