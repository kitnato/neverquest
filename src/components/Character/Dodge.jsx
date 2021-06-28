import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { dodge } from "state/atoms";

import dodgeIcon from "icons/wingfoot.svg";

export default function Dodge() {
  const dodgeValue = useRecoilValue(dodge);

  return (
    <WithIcon
      className={`${dodgeValue.current === 0 ? "invisible" : ""}`}
      icon={dodgeIcon}
      alt="Dodge"
    >
      {dodgeValue.current * 100}%
    </WithIcon>
  );
}
