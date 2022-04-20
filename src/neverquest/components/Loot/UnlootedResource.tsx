import { RecoilState, useRecoilValue } from "recoil";

import { LootType } from "neverquest/env.d";
import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";

export default function UnlootedResource({
  atom,
  name,
}: {
  atom: RecoilState<number>;
  name: LootType;
}) {
  const unlootedResourceValue = useRecoilValue(atom);

  if (unlootedResourceValue === 0) {
    return null;
  }

  switch (name) {
    case LootType.Aether:
      return <Aether value={unlootedResourceValue} />;
    case LootType.Coins:
      return <Coins value={unlootedResourceValue} />;
    case LootType.Scrap:
      return <Scrap value={unlootedResourceValue} />;
  }

  return null;
}
