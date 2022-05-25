import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { ArrowRight } from "react-bootstrap-icons";
import { useAtomValue } from "jotai";

import Coins from "neverquest/components/Loot/Coins";
import Scrap from "neverquest/components/Loot/Scrap";
import useReserve from "neverquest/hooks/useReserve";
import { exchangeCoin, exchangeScrap } from "neverquest/state/caravan";
import { scrap } from "neverquest/state/loot";
import { UIVariant } from "neverquest/types/ui";

export default function SellScrap() {
  const setReserve = useReserve();
  const scrapValue = useAtomValue(scrap);
  const exchangeScrapValue = useAtomValue(exchangeScrap);
  const exchangeCoinValue = useAtomValue(exchangeCoin);

  const canSell = scrapValue >= exchangeScrapValue;

  const sellScrap = () => {
    setReserve({ coinsDifference: exchangeCoinValue, scrapDifference: -exchangeScrapValue });
  };

  return (
    <Stack direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <Scrap tooltip="Scrap (give)" value={exchangeScrapValue} />

        <ArrowRight />

        <Coins tooltip="Coins (receive)" value={exchangeCoinValue} />
      </Stack>

      <OverlayTrigger
        overlay={<Tooltip>Not enough scrap!</Tooltip>}
        placement="top"
        trigger={canSell ? [] : ["hover", "focus"]}
      >
        <span className="d-inline-block">
          <Button disabled={!canSell} onClick={sellScrap} variant={UIVariant.Outline}>
            Sell
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
