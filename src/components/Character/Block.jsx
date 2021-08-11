import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { shield } from "state/atoms";

import blockIcon from "icons/round-shield.svg";

export default function Block() {
  const shieldValue = useRecoilValue(shield);

  return (
    <WithIcon
      alt="Block"
      className={`${shieldValue.name === null ? "invisible" : ""}`}
      icon={blockIcon}
    >
      {shieldValue.block * 100}
    </WithIcon>
  );
}
