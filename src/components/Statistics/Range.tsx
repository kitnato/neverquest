import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconMarksmanship } from "@neverquest/icons/marksmanship.svg";
import { ReactComponent as IconRange } from "@neverquest/icons/range.svg";
import { ReactComponent as IconRanged } from "@neverquest/icons/ranged.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { range } from "@neverquest/state/statistics";
import { isRanged } from "@neverquest/types/type-guards";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function Range() {
  const isShowingValue = useRecoilValue(isShowing("range"));
  const marksmanshipValue = useRecoilValue(masteryStatistic("marksmanship"));
  const skillArchery = useRecoilValue(skills("archery"));
  const rangeValue = useRecoilValue(range);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("range"),
    stop: ({ previous }) => previous === null || !skillArchery,
    type: "time",
    value: range,
  });

  if (!isShowingValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Range details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>
                        <IconImage Icon={IconRanged} size="tiny" />
                        &nbsp;{isRanged(weaponValue) ? formatTime(weaponValue.range) : LABEL_EMPTY}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconMarksmanship} size="tiny" />
                        &nbsp;Marksmanship:
                      </td>

                      <td>{`+${formatPercentage(marksmanshipValue)}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillArchery ? ["hover", "focus"] : []}
          >
            <span>
              {skillArchery
                ? rangeValue === 0
                  ? LABEL_EMPTY
                  : formatTime(rangeValue)
                : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <FloatingText deltaType="range" />
        </Stack>
      }
      Icon={IconRange}
      isAnimated
      tooltip="Range"
    />
  );
}
