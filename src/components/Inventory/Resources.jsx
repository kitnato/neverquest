import { useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import { show } from "state/global";

export default function Resources() {
  const showValue = useRecoilValue(show);

  return showValue.resources && <LootDisplay isInventory />;
}
