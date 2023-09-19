import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconMight } from "@neverquest/icons/might.svg";
import { ReactComponent as IconShieldStagger } from "@neverquest/icons/shield-stagger.svg";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/stagger.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { shield } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { staggerRating, staggerWeapon } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const { stagger } = useRecoilValue(shield);
  const isShowingStagger = useRecoilValue(isShowing("stagger"));
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const skillTraumatology = useRecoilValue(skills("traumatology"));
  const staggerRatingValue = useRecoilValue(staggerRating);
  const staggerWeaponValue = useRecoilValue(staggerWeapon);

  useDeltaText({
    delta: deltas("staggerRating"),
    stop: ({ previous }) => previous === null || !skillTraumatology,
    value: staggerRating,
  });

  if (!isShowingStagger) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Stagger rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance on hit:</td>

                      <td>
                        <IconImage Icon={IconStagger} size="tiny" />
                        &nbsp;
                        {staggerWeaponValue === 0
                          ? LABEL_EMPTY
                          : formatPercentage(staggerWeaponValue)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance on block:</td>

                      <td>
                        <IconImage Icon={IconShieldStagger} size="tiny" />
                        &nbsp;{formatPercentage(stagger)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconMight} size="tiny" />
                        &nbsp;Might:
                      </td>

                      <td>{`${formatTime(mightValue)}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillTraumatology ? ["hover", "focus"] : []}
          >
            <span>{skillTraumatology ? staggerRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="staggerRating" />
        </Stack>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}
