import { useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import { show } from "state/global";
import { aether, coins, scrap } from "state/resources";

export default function Resources() {
  const aetherValue = useRecoilValue(aether);
  const coinsValue = useRecoilValue(coins);
  const scrapValue = useRecoilValue(scrap);
  const showValue = useRecoilValue(show);

  return (
    showValue.resources && (
      <LootDisplay aether={aetherValue} coins={coinsValue} scrap={scrapValue} />
    )
  );
}
