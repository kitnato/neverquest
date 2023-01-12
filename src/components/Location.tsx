import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/mountain-road.svg";
import { locationName } from "@neverquest/state/encounter";
import { OverlayPlacement } from "@neverquest/types/ui";

export default function () {
  const locationNameValue = useRecoilValue(locationName);

  return (
    <IconDisplay
      contents={locationNameValue}
      Icon={Icon}
      iconProps={{ placement: OverlayPlacement.Bottom }}
      isAnimated
      tooltip="Location"
    />
  );
}
