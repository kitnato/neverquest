import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconLocation } from "@neverquest/icons/location.svg";
import { location } from "@neverquest/state/encounter";

export function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <IconDisplay
      contents={locationValue}
      Icon={IconLocation}
      iconProps={{ overlayPlacement: "bottom" }}
      isAnimated
      tooltip="Location"
    />
  );
}
