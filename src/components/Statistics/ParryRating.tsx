import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import { PARRY_ABSORPTION, PARRY_DAMAGE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconFinesse from "@neverquest/icons/finesse.svg?react";
import IconParryRating from "@neverquest/icons/parry-rating.svg?react";
import IconParry from "@neverquest/icons/parry.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import {
  parryAbsorption,
  parryChance,
  parryDamage,
  parryRating,
} from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ParryRating() {
  const escrimeValue = useRecoilValue(isSkillAcquired("escrime"));
  const finesseValue = useRecoilValue(masteryStatistic("finesse"));
  const parryAbsorptionValue = useRecoilValue(parryAbsorption);
  const parryChanceValue = useRecoilValue(parryChance);
  const parryDamageValue = useRecoilValue(parryDamage);
  const parryRatingValue = useRecoilValue(parryRating);
  const { gearClass } = useRecoilValue(weapon);

  const isEmpty = !escrimeValue || gearClass !== "slashing" || parryRatingValue === 0;

  useDeltaText({
    delta: "parryRating",
    state: parryRating,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay Icon={IconParryRating} isAnimated tooltip="Parry rating">
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Parry rating details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance on hit:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconParry} isSmall />

                          {formatNumber({ format: "percentage", value: parryChanceValue })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage reflected:</td>

                      <td>
                        {formatNumber({ decimals: 0, format: "percentage", value: PARRY_DAMAGE })}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage absorbed:</td>

                      <td>
                        {formatNumber({
                          decimals: 0,
                          format: "percentage",
                          value: PARRY_ABSORPTION,
                        })}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconFinesse} isSmall />
                          Finesse:
                        </Stack>
                      </td>

                      <td>{`+${formatNumber({
                        decimals: 0,
                        format: "percentage",
                        value: finesseValue,
                      })}`}</td>
                    </tr>

                    {finesseValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total reflected:</td>

                          <td>{formatNumber({ format: "percentage", value: parryDamageValue })}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total absorbed:</td>

                          <td>
                            {formatNumber({ format: "percentage", value: parryAbsorptionValue })}
                          </td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{parryRatingValue}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="parryRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
