import { RecoilState, useRecoilValue } from "recoil";

import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";
import { LootType } from "neverquest/env";

export default function Looted({
  atom,
  name,
  showAtom,
}: {
  atom: RecoilState<number>;
  name: LootType;
  showAtom: RecoilState<boolean>;
}) {
  const showValue = useRecoilValue(showAtom);
  const resourceValue = useRecoilValue(atom);

  if (!showValue) {
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
