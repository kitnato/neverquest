import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconLocation } from "@neverquest/icons/location.svg";
import { locationName } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Location() {
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const locationNameValue = useRecoilValue(locationName);

  return (
    <div className={`${isShowingLocation ? getAnimationClass({ name: "flipInX" }) : "invisible"}`}>
      <IconDisplay
        contents={locationNameValue}
        Icon={IconLocation}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Location"
      />
    </div>
  );
}
