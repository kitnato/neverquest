import { useEffect } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";

import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";
import { LootType } from "neverquest/env";

export default function LootedResource({
  atom,
  name,
  showAtom,
}: {
  atom: RecoilState<number>;
  name: LootType;
  showAtom: RecoilState<boolean>;
}) {
  const [showValue, setShow] = useRecoilState(showAtom);
  const lootedResourceValue = useRecoilValue(atom);

  useEffect(() => {
    if (lootedResourceValue > 0 && !showValue) {
      setShow(true);
    }
  }, [lootedResourceValue, showValue]);

  if (!showValue) {
    return null;
  }

  switch (name) {
    case LootType.Aether:
      return <Aether value={lootedResourceValue} />;
    case LootType.Coins:
      return <Coins value={lootedResourceValue} />;
    case LootType.Scrap:
      return <Scrap value={lootedResourceValue} />;
  }

  return null;
}
