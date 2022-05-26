import { useSetAtom, useAtom } from "jotai";

import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/resources";
import { showAether, showCoins, showScrap } from "neverquest/state/show";
import { deltaAether, deltaCoins, deltaScrap } from "neverquest/state/deltas";
import { FloatingTextType } from "neverquest/types/ui";

export default function useResource() {
  const [aetherLootValue, setAetherLoot] = useAtom(aetherLoot);
  const [coinsLootValue, setCoinsLoot] = useAtom(coinsLoot);
  const [scrapLootValue, setScrapLoot] = useAtom(scrapLoot);
  const [showAetherValue, setShowAether] = useAtom(showAether);
  const [showCoinsValue, setShowCoins] = useAtom(showCoins);
  const [showScrapValue, setShowScrap] = useAtom(showScrap);
  const setAether = useSetAtom(aether);
  const setDeltaAether = useSetAtom(deltaAether);
  const setCoins = useSetAtom(coins);
  const setDeltaCoins = useSetAtom(deltaCoins);
  const setScrap = useSetAtom(scrap);
  const setDeltaScrap = useSetAtom(deltaScrap);

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

      setAether((current) => current + aetherValue);
      setDeltaAether({
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
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

      setCoins((current) => current + coinsValue);
      setDeltaCoins({
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
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

      setScrap((current) => current + scrapValue);
      setDeltaScrap({
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
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
