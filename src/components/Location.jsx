import React from "react";
import { useRecoilValue } from "recoil";

import { location } from "state/atoms";
import compassIcon from "icons/compass.svg";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <div className="d-flex my-3">
      <img src={compassIcon} alt="Location" height={25} width={25} />
      <span className="ml-2">{locationValue}</span>
    </div>
  );
}
