import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import compassIcon from "icons/compass.svg";
import { location } from "state/global";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={compassIcon} tooltip="Location" />

      <span>{locationValue}</span>
    </div>
  );
}
