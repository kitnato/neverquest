import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { PARRY_ABSORPTION, PARRY_DAMAGE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFinesse } from "@neverquest/icons/finesse.svg";
import { ReactComponent as IconParryRating } from "@neverquest/icons/parry-rating.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { parry, parryAbsorption, parryDamage, parryRating } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function ParryRating() {
  const finesseValue = useRecoilValue(masteryStatistic("finesse"));
  const parryValue = useRecoilValue(parry);
  const parryAbsorptionValue = useRecoilValue(parryAbsorption);
  const parryDamageValue = useRecoilValue(parryDamage);
  const parryRatingValue = useRecoilValue(parryRating);
  const escrimeValue = useRecoilValue(isSkillAcquired("escrime"));
  const { gearClass } = useRecoilValue(weapon);

  useDeltaText({
    delta: "parry",
    value: parryRating,
  });

  if (!escrimeValue || gearClass !== "slashing") {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
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
                          <IconImage Icon={IconParry} size="small" />

                          {formatValue({ format: "percentage", value: parryValue })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage reflected:</td>

                      <td>
                        {formatValue({ decimals: 0, format: "percentage", value: PARRY_DAMAGE })}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Damage absorbed:</td>

                      <td>
                        {formatValue({
                          decimals: 0,
                          format: "percentage",
                          value: PARRY_ABSORPTION,
                        })}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconFinesse} size="small" />
                          Finesse:
                        </Stack>
                      </td>

                      <td>{`+${formatValue({
                        decimals: 0,
                        format: "percentage",
                        value: finesseValue,
                      })}`}</td>
                    </tr>

                    {finesseValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total reflected:</td>

                          <td>{formatValue({ format: "percentage", value: parryDamageValue })}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total absorbed:</td>

                          <td>
                            {formatValue({ format: "percentage", value: parryAbsorptionValue })}
                          </td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={escrimeValue ? ["hover", "focus"] : []}
          >
            <span>{escrimeValue ? parryRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="parry" />
        </Stack>
      }
      Icon={IconParryRating}
      isAnimated
      tooltip="Parry rating"
    />
  );
}
