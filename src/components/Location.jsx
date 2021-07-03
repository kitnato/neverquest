import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { location } from "state/selectors";
import compassIcon from "icons/compass.svg";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <WithIcon icon={compassIcon} alt="Location">
      <span>{locationValue}</span>
    </WithIcon>
  );
}
