import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import Coins from "@neverquest/components/Resource/Coins";
import Scrap from "@neverquest/components/Resource/Scrap";
import { CLASS_DIV_FULL_WIDTH } from "@neverquest/constants";
import { EXCHANGE_COINS, EXCHANGE_SCRAP } from "@neverquest/constants/caravan";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { scrap } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const scrapValue = useRecoilValue(scrap);

  const transactResources = useTransactResources();

  const canSell = scrapValue >= EXCHANGE_SCRAP;
  const maxCoins = Math.floor(scrapValue / EXCHANGE_SCRAP);
  const maxScrap = maxCoins * EXCHANGE_SCRAP;

  const handleSell = (sellAll?: boolean) => {
    if (sellAll) {
      transactResources({
        coinsDifference: maxCoins,
        scrapDifference: -maxScrap,
      });
    } else {
      transactResources({
        coinsDifference: EXCHANGE_COINS,
        scrapDifference: -EXCHANGE_SCRAP,
      });
    }
  };

  return (
    <div className={CLASS_DIV_FULL_WIDTH}>
      <Stack direction="horizontal" gap={3}>
        <Scrap tooltip="Scrap (give)" value={EXCHANGE_SCRAP} />

        <ArrowRight />

        <Coins tooltip="Coins (receive)" value={EXCHANGE_COINS} />
      </Stack>

      <Stack direction="horizontal" gap={3}>
        <OverlayTrigger
          overlay={
            <Tooltip>
              {canSell
                ? `Sell ${EXCHANGE_SCRAP} scrap for ${EXCHANGE_COINS} coins`
                : "No scrap left."}
            </Tooltip>
          }
          placement="top"
        >
          <span className="d-inline-block">
            <Button
              disabled={!canSell}
              onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                currentTarget.blur();
                handleSell();
              }}
              variant={UIVariant.Outline}
            >
              Sell
            </Button>
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          overlay={
            <Tooltip>
              {canSell ? `Sell ${maxScrap} scrap for ${maxCoins} coins` : "No scrap left."}
            </Tooltip>
          }
          placement="top"
        >
          <span className="d-inline-block">
            <Button
              disabled={!canSell}
              onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                currentTarget.blur();
                handleSell(true);
              }}
              variant={UIVariant.Outline}
            >
              Sell all
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
