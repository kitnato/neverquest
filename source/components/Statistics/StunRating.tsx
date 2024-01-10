import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconMight from "@neverquest/icons/might.svg?react";
import IconStunRating from "@neverquest/icons/stun-rating.svg?react";
import IconStun from "@neverquest/icons/stun.svg?react";
import { stunChance } from "@neverquest/state/ailments";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { stunRating } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass, getWeaponIcon } from "@neverquest/utilities/getters";

export function StunRating() {
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const stunChanceValue = useRecoilValue(stunChance);
  const stunRatingValue = useRecoilValue(stunRating);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: "stunRating",
    state: stunRating,
  });

  if (stunRatingValue > 0) {
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
                        <IconDisplay
                          Icon={getWeaponIcon(weaponValue)}
                          iconProps={{ className: "small" }}
                        >
                          <span>Chance:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <IconDisplay Icon={IconStun} iconProps={{ className: "small" }}>
                          <span>
                            {formatNumber({
                              format: "percentage",
                              value: stunChanceValue,
                            })}
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
