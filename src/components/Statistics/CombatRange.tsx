import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconMarksmanship } from "@neverquest/icons/marksmanship.svg";
import { ReactComponent as IconRange } from "@neverquest/icons/range.svg";
import { ReactComponent as IconRanged } from "@neverquest/icons/ranged.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { range } from "@neverquest/state/statistics";
import { isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

export function CombatRange() {
  const marksmanshipValue = useRecoilValue(masteryStatistic("marksmanship"));
  const archeryValue = useRecoilValue(skills("archery"));
  const rangeValue = useRecoilValue(range);
  const weaponValue = useRecoilValue(weapon);

  const isWeaponRanged = isRanged(weaponValue);

  useDeltaText({
    delta: deltas("range"),
    format: "time",
    value: range,
  });

  if (!archeryValue || !isWeaponRanged) {
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
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconRanged} size="small" />

                          {isWeaponRanged
                            ? formatValue({ format: "time", value: weaponValue.range })
                            : LABEL_EMPTY}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconMarksmanship} size="small" />
                          Marksmanship:
                        </Stack>
                      </td>

                      <td>{`+${formatValue({
                        format: "percentage",
                        value: marksmanshipValue,
                      })}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={archeryValue ? ["hover", "focus"] : []}
          >
            <span>
              {archeryValue
                ? rangeValue === 0
                  ? LABEL_EMPTY
                  : formatValue({ format: "time", value: rangeValue })
                : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <FloatingText delta="range" />
        </Stack>
      }
      Icon={IconRange}
      isAnimated
      tooltip="Range"
    />
  );
}
