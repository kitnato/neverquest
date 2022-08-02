import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Coins from "@neverquest/components/Resource/Coins";
import Scrap from "@neverquest/components/Resource/Scrap";
import { exchangeCoin, exchangeScrap } from "@neverquest/state/caravan";
import { resourcesBalance, scrap } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function SellScrap() {
  const scrapValue = useRecoilValue(scrap);
  const exchangeScrapValue = useRecoilValue(exchangeScrap);
  const exchangeCoinValue = useRecoilValue(exchangeCoin);
  const balanceResources = useSetRecoilState(resourcesBalance);

  const canSell = scrapValue >= exchangeScrapValue;

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
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
          <Button
            disabled={!canSell}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              balanceResources({
                coinsDifference: exchangeCoinValue,
                scrapDifference: -exchangeScrapValue,
              });
            }}
            variant={UIVariant.Outline}
          >
            Sell
          </Button>
        </span>
      </OverlayTrigger>
    </div>
  );
}
