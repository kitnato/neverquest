import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { ArrowRight } from "react-bootstrap-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";
import { UIVariant } from "neverquest/env";
import { exchangeCoin, exchangeScrap } from "neverquest/state/caravan";
import { coins, scrap } from "neverquest/state/loot";

export default function SellScrap() {
  const [scrapValue, setScrap] = useRecoilState(scrap);
  const exchangeScrapValue = useRecoilValue(exchangeScrap);
  const exchangeCoinValue = useRecoilValue(exchangeCoin);
  const setCoins = useSetRecoilState(coins);

  const sellScrap = () => {
    setScrap((currentScrap) => currentScrap - exchangeScrapValue);
    setCoins((currentCoins) => currentCoins + exchangeCoinValue);
  };

  return (
    <Stack direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <Scrap tooltip="Scrap (give)" value={exchangeScrapValue} />

        <ArrowRight />

        <Coins tooltip="Coins (receive)" value={exchangeCoinValue} />
      </Stack>

      <Button
        disabled={scrapValue < exchangeScrapValue}
        onClick={sellScrap}
        variant={UIVariant.Outline}
      >
        Sell
      </Button>
    </Stack>
  );
}
