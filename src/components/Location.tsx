import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/mountain-road.svg";
import { locationName } from "@neverquest/state/encounter";

export function Location() {
  const locationNameValue = useRecoilValue(locationName);

  return (
    <IconDisplay
      contents={locationNameValue}
      Icon={Icon}
      iconProps={{ overlayPlacement: "bottom" }}
      isAnimated
      tooltip="Location"
    />
  );
}
