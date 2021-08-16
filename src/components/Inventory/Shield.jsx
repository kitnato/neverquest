import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { shield } from "state/equipment";

import icon from "icons/round-shield.svg";

export default function Shield() {
  const shieldValue = useRecoilValue(shield);

  return (
    shieldValue.name !== null && (
      <WithIcon alt="Armor" icon={icon}>
        {shieldValue.name}
      </WithIcon>
    )
  );
}
