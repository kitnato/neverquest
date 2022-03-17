import { useEffect } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";

import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";
import { LootType } from "neverquest/env.d";
import { show } from "neverquest/state/global";

export default function LootedResource({
  atom,
  name,
}: {
  atom: RecoilState<number>;
  name: LootType;
}) {
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
    case LootType.Aether:
      return <Aether value={lootedResourceValue} />;
    case LootType.Coins:
      return <Coins value={lootedResourceValue} />;
    case LootType.Scrap:
      return <Scrap value={lootedResourceValue} />;
    default:
      return null;
  }
}
