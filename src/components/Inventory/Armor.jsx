import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { armor } from "state/equipment";

import icon from "icons/shoulder-armor.svg";

export default function Armor() {
  const armorValue = useRecoilValue(armor);

  return (
    armorValue.name !== null && (
      <WithIcon alt="Armor" icon={icon}>
        {armorValue.name}
      </WithIcon>
    )
  );
}
