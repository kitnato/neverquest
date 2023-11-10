import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconLocation from "@neverquest/icons/location.svg?react";
import { locationName } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Location() {
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const locationNameValue = useRecoilValue(locationName);

  return (
    <div className={`${isShowingLocation ? getAnimationClass({ name: "flipInX" }) : "invisible"}`}>
      <IconDisplay
        Icon={IconLocation}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Location"
      >
        {locationNameValue}
      </IconDisplay>
    </div>
  );
}
