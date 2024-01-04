import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";

import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconMight from "@neverquest/icons/might.svg?react";
import IconStunRating from "@neverquest/icons/stun-rating.svg?react";
import IconStun from "@neverquest/icons/stun.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { stunRating } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function StunRating() {
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const stunRatingValue = useRecoilValue(stunRating);
  const traumatologyValue = useRecoilValue(isSkillAcquired("traumatology"));
  const { abilityChance, gearClass } = useRecoilValue(weapon);

  const isEmpty = !traumatologyValue || gearClass !== "blunt" || stunRatingValue === 0;

  useDeltaText({
    delta: "stunRating",
    state: stunRating,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconStunRating}
        tooltip="Stun rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Chance:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconStun} iconProps={{ className: "small" }}>
                          <span>
                            {formatNumber({ format: "percentage", value: abilityChance })}
                          </span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <IconDisplay Icon={IconMight} iconProps={{ className: "small" }}>
                          <span>Might:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <span>{formatNumber({ format: "time", value: mightValue })} duration</span>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ value: stunRatingValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="stunRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
