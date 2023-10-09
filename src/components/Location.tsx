import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconLocation } from "@neverquest/icons/location.svg";
import { locationName } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";

export function Location() {
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const locationNameValue = useRecoilValue(locationName);

  if (!isShowingLocation) {
    return null;
  }

  return (
    <IconDisplay
      contents={locationNameValue}
      Icon={IconLocation}
      iconProps={{ overlayPlacement: "bottom" }}
      isAnimated
      tooltip="Location"
    />
  );
}
