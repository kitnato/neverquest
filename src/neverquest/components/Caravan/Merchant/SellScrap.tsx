import { useAtomValue } from "jotai";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { ArrowRight } from "react-bootstrap-icons";

import Coins from "neverquest/components/Resource/Coins";
import Scrap from "neverquest/components/Resource/Scrap";
import useResource from "neverquest/hooks/useResource";
import { exchangeCoin, exchangeScrap } from "neverquest/state/caravan";
import { scrap } from "neverquest/state/resources";
import { UIVariant } from "neverquest/types/ui";

export default function SellScrap() {
  const setResource = useResource();
  const scrapValue = useAtomValue(scrap);
  const exchangeScrapValue = useAtomValue(exchangeScrap);
  const exchangeCoinValue = useAtomValue(exchangeCoin);

  const canSell = scrapValue >= exchangeScrapValue;

  const sellScrap = () => {
    setResource({ coinsDifference: exchangeCoinValue, scrapDifference: -exchangeScrapValue });
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
