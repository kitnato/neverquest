import { useSetRecoilState, useRecoilState } from "recoil";

import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function useLoot() {
  const [aetherLootValue, setAetherLoot] = useRecoilState(aetherLoot);
  const [coinsLootValue, setCoinsLoot] = useRecoilState(coinsLoot);
  const [scrapLootValue, setScrapLoot] = useRecoilState(scrapLoot);
  const [showAetherValue, setShowAether] = useRecoilState(showAether);
  const [showCoinsValue, setShowCoins] = useRecoilState(showCoins);
  const [showScrapValue, setShowScrap] = useRecoilState(showScrap);
  const setAether = useSetRecoilState(aether);
  const setCoins = useSetRecoilState(coins);
  const setScrap = useSetRecoilState(scrap);

  return ({
    aetherDifference,
    coinsDifference,
    scrapDifference,
  }: Partial<{ aetherDifference: number; coinsDifference: number; scrapDifference: number }>) => {
    const aetherValue = aetherDifference || aetherLootValue;
    const coinsValue = coinsDifference || coinsLootValue;
    const scrapValue = scrapDifference || scrapLootValue;
    const isLooting =
      aetherDifference === undefined &&
      coinsDifference === undefined &&
      scrapDifference === undefined;

    if (aetherValue !== 0) {
      setAether((currentAether) => currentAether + aetherValue);

      if (!showAetherValue) {
        setShowAether(true);
      }

      if (isLooting) {
        setAetherLoot(0);
      }
    }

    if (coinsValue !== 0) {
      setCoins((currentCoins) => currentCoins + coinsValue);

      if (!showCoinsValue) {
        setShowCoins(true);
      }

      if (isLooting) {
        setCoinsLoot(0);
      }
    }

    if (scrapValue !== 0) {
      setScrap((currentScrap) => currentScrap + scrapValue);

      if (!showScrapValue) {
        setShowScrap(true);
      }

      if (isLooting) {
        setScrapLoot(0);
      }
    }
  };
}
