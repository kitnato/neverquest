import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react";
import IconRange from "@neverquest/icons/range.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import { range, weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

export function CombatRange() {
  const marksmanshipValue = useRecoilValue(masteryStatistic("marksmanship"));
  const archeryValue = useRecoilValue(isSkillAcquired("archery"));
  const rangeValue = useRecoilValue(range);
  const weaponValue = useRecoilValue(weapon);

  const isWeaponRanged = isRanged(weaponValue);

  useDeltaText({
    delta: "range",
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
                <PopoverHeader className="text-center">Range details</PopoverHeader>

                <PopoverBody>
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
                </PopoverBody>
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

          <FloatingTextQueue delta="range" />
        </Stack>
      }
      Icon={IconRange}
      isAnimated
      tooltip="Range"
    />
  );
}
