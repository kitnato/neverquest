import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import compassIcon from "icons/compass.svg";
import { location } from "state/global";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <WithIcon icon={compassIcon} alt="Location">
      <span>{locationValue}</span>
    </WithIcon>
  );
}
