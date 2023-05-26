import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconLocation } from "@neverquest/icons/location.svg";
import { locationName } from "@neverquest/state/encounter";

export function LocationDisplay() {
  const locationNameValue = useRecoilValue(locationName);

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
