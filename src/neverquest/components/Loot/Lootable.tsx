import { RecoilState, useRecoilValue } from "recoil";

import { LootType } from "neverquest/env";
import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";

export default function Lootable({ atom, name }: { atom: RecoilState<number>; name: LootType }) {
  const resourceValue = useRecoilValue(atom);

  if (resourceValue === 0) {
    return null;
  }

  switch (name) {
    case LootType.Aether:
      return <Aether value={resourceValue} />;
    case LootType.Coins:
      return <Coins value={resourceValue} />;
    case LootType.Scrap:
      return <Scrap value={resourceValue} />;
    default:
      return null;
  }
}
