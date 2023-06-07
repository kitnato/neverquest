import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { staggerDuration, staggerRating, staggerWeapon } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const { stagger } = useRecoilValue(shield);
  const isShowingStagger = useRecoilValue(isShowing("stagger"));
  const staggerDurationValue = useRecoilValue(staggerDuration);
  const staggerRatingValue = useRecoilValue(staggerRating);
  const staggerWeaponValue = useRecoilValue(staggerWeapon);
  const skillTraumatology = useRecoilValue(skills("traumatology"));

  const { name } = MASTERIES.might;

  useDeltaText({
    atomDelta: deltas("staggerRating"),
    atomValue: staggerRating,
    stop: (previous) => previous === null || !skillTraumatology,
  });

  if (!isShowingStagger) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Stagger rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on hit:</td>

                      <td>{formatPercentage(staggerWeaponValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on block:</td>

                      <td>{formatPercentage(stagger)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatMilliseconds(staggerDurationValue)} duration`}</td>
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
        </>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}
