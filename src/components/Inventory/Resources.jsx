import { useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import { aether, coins, scrap } from "state/loot";

export default function Resources() {
  const aetherValue = useRecoilValue(aether);
  const coinsValue = useRecoilValue(coins);
  const scrapValue = useRecoilValue(scrap);

  return (
    <LootDisplay aether={aetherValue} coins={coinsValue} scrap={scrapValue} />
  );
}
