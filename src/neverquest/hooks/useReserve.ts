import { useSetRecoilState, useRecoilState } from "recoil";

import { UIFloatingTextType } from "neverquest/env";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";
import { showAether, showCoins, showScrap } from "neverquest/state/show";
import { deltaAether, deltaCoins, deltaScrap } from "neverquest/state/deltas";

export default function useReserve() {
  const [aetherLootValue, setAetherLoot] = useRecoilState(aetherLoot);
  const [coinsLootValue, setCoinsLoot] = useRecoilState(coinsLoot);
  const [scrapLootValue, setScrapLoot] = useRecoilState(scrapLoot);
  const [showAetherValue, setShowAether] = useRecoilState(showAether);
  const [showCoinsValue, setShowCoins] = useRecoilState(showCoins);
  const [showScrapValue, setShowScrap] = useRecoilState(showScrap);
  const setAether = useSetRecoilState(aether);
  const setDeltaAether = useSetRecoilState(deltaAether);
  const setCoins = useSetRecoilState(coins);
  const setDeltaCoins = useSetRecoilState(deltaCoins);
  const setScrap = useSetRecoilState(scrap);
  const setDeltaScrap = useSetRecoilState(deltaScrap);

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
      const isPositive = aetherValue > 0;

      setAether((currentAether) => currentAether + aetherValue);
      setDeltaAether({
        color: isPositive ? UIFloatingTextType.Positive : UIFloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${aetherValue}`,
      });

      if (!showAetherValue) {
        setShowAether(true);
      }

      if (isLooting) {
        setAetherLoot(0);
      }
    }

    if (coinsValue !== 0) {
      const isPositive = coinsValue > 0;

      setCoins((currentCoins) => currentCoins + coinsValue);
      setDeltaCoins({
        color: isPositive ? UIFloatingTextType.Positive : UIFloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${coinsValue}`,
      });

      if (!showCoinsValue) {
        setShowCoins(true);
      }

      if (isLooting) {
        setCoinsLoot(0);
      }
    }

    if (scrapValue !== 0) {
      const isPositive = scrapValue > 0;

      setScrap((currentScrap) => currentScrap + scrapValue);
      setDeltaScrap({
        color: isPositive ? UIFloatingTextType.Positive : UIFloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${scrapValue}`,
      });

      if (!showScrapValue) {
        setShowScrap(true);
      }

      if (isLooting) {
        setScrapLoot(0);
      }
    }
  };
}
