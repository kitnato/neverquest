import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react";
import IconRange from "@neverquest/icons/range.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { range } from "@neverquest/state/statistics";
import { isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CombatRange() {
  const marksmanshipValue = useRecoilValue(masteryStatistic("marksmanship"));
  const archeryValue = useRecoilValue(isSkillAcquired("archery"));
  const rangeValue = useRecoilValue(range);
  const weaponValue = useRecoilValue(weapon);

  const isWeaponRanged = isRanged(weaponValue);
  const isEmpty = !archeryValue || !isWeaponRanged || rangeValue === 0;

  useDeltaText({
    delta: "range",
    format: "time",
    state: range,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconRange}
        tooltip="Range"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Range details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Weapon:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconRanged} />

                          <span>{formatNumber({ format: "time", value: weaponValue.range })}</span>
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconMarksmanship} />

                          <span>Marksmanship:</span>
                        </Stack>
                      </td>

                      <td>
                        <span>
                          +
                          {formatNumber({
                            format: "percentage",
                            value: marksmanshipValue,
                          })}
                        </span>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>
              {rangeValue === 0 ? LABEL_EMPTY : formatNumber({ format: "time", value: rangeValue })}
            </span>
          </OverlayTrigger>

          <DeltasDisplay delta="range" />
        </Stack>
      </IconDisplay>
    );
  }
}
