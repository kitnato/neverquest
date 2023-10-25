import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconMight from "@neverquest/icons/might.svg?react";
import IconStunRating from "@neverquest/icons/stun-rating.svg?react";
import IconStun from "@neverquest/icons/stun.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { stunRating } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function StunRating() {
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const stunRatingValue = useRecoilValue(stunRating);
  const traumatologyValue = useRecoilValue(isSkillAcquired("traumatology"));
  const { abilityChance, gearClass } = useRecoilValue(weapon);

  useDeltaText({
    delta: "stunRating",
    stop: () => !traumatologyValue,
    value: stunRating,
  });

  if (!traumatologyValue || gearClass !== "blunt") {
    return null;
  }

  return (
    <IconDisplay Icon={IconStunRating} isAnimated tooltip="Stun rating">
      <Stack direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Stun rating details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconStun} size="small" />

                        {formatNumber({ format: "percentage", value: abilityChance })}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconMight} size="small" />
                        Might:
                      </Stack>
                    </td>

                    <td>{`${mightValue} hits`}</td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={traumatologyValue ? ["hover", "focus"] : []}
        >
          <span>{traumatologyValue ? stunRatingValue : LABEL_EMPTY}</span>
        </OverlayTrigger>

        <FloatingTextQueue delta="stunRating" />
      </Stack>
    </IconDisplay>
  );
}
