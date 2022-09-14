import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/mountain-road.svg";
import { location } from "@neverquest/state/encounter";
import { OverlayPlacement } from "@neverquest/types/ui";

export default function () {
  const locationValue = useRecoilValue(location);

  return (
    <IconDisplay
      contents={locationValue}
      Icon={Icon}
      iconProps={{ placement: OverlayPlacement.Bottom }}
      tooltip="Location"
    />
  );
}
