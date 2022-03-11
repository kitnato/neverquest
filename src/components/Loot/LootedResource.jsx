import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Aether from "components/Loot/Aether";
import Coins from "components/Loot/Coins";
import Scrap from "components/Loot/Scrap";
import { show } from "state/global";

export default function LootedResource({ atom, name }) {
  const [showValue, setShow] = useRecoilState(show);
  const lootedResourceValue = useRecoilValue(atom);

  useEffect(() => {
    if (lootedResourceValue > 0 && !showValue[name]) {
      setShow({ ...showValue, [name]: true });
    }
  }, [lootedResourceValue, name, setShow, showValue]);

  if (!showValue[name]) {
    return null;
  }

  switch (name) {
    case "aether":
      return <Aether value={lootedResourceValue} />;
    case "coins":
      return <Coins value={lootedResourceValue} />;
    case "scrap":
      return <Scrap value={lootedResourceValue} />;
    default:
      break;
  }
}
