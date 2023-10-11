import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconInoculated } from "@neverquest/icons/inoculated.svg";
import { armor } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { deflection } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatValue } from "@neverquest/utilities/formatters";

export function Deflection() {
  const armorValue = useRecoilValue(armor);
  const deflectionValue = useRecoilValue(deflection);
  const isSkillAcquiredArmorcraft = useRecoilValue(isSkillAcquired("armorcraft"));
  const isTraitAcquiredInoculated = useRecoilValue(isTraitAcquired("inoculated"));

  const armorDeflection = armorValue.deflection;

  useDeltaText({
    delta: "deflection",
    format: "percentage",
    value: deflection,
  });

  if (!isSkillAcquiredArmorcraft) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Deflection details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Armor:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDeflection} size="small" />

                          {formatValue({ format: "percentage", value: armorValue.deflection })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconInoculated} size="small" />
                          Inoculated:
                        </Stack>
                      </td>

                      <td>x2</td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={isTraitAcquiredInoculated ? ["focus", "hover"] : []}
          >
            <span>
              {armorDeflection === 0
                ? LABEL_EMPTY
                : formatValue({ format: "percentage", value: deflectionValue })}
            </span>
          </OverlayTrigger>

          <FloatingTextQueue delta="deflection" />
        </Stack>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Total deflection chance"
    />
  );
}
