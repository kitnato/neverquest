import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import Coins from "@neverquest/components/Resource/Coins";
import Scrap from "@neverquest/components/Resource/Scrap";
import { CLASS_DIV_FULL_WIDTH } from "@neverquest/constants";
import { EXCHANGE_COIN, EXCHANGE_SCRAP } from "@neverquest/constants/caravan";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { scrap } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const scrapValue = useRecoilValue(scrap);

  const transactResources = useTransactResources();

  const canSell = scrapValue >= EXCHANGE_SCRAP;

  const handleSellSingle = () =>
    transactResources({
      coinsDifference: EXCHANGE_COIN,
      scrapDifference: -EXCHANGE_SCRAP,
    });
  const handleSellAll = () => {
    const amount = Math.floor(scrapValue / EXCHANGE_SCRAP);

    transactResources({
      coinsDifference: amount,
      scrapDifference: -(amount * EXCHANGE_SCRAP),
    });
  };

  const SellButton = ({ handleClick, label }: { handleClick: () => void; label: string }) => (
    <OverlayTrigger
      overlay={<Tooltip>No scrap left.</Tooltip>}
      placement="top"
      trigger={canSell ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button
          disabled={!canSell}
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();
            handleClick();
          }}
          variant={UIVariant.Outline}
        >
          {label}
        </Button>
      </span>
    </OverlayTrigger>
  );

  return (
    <div className={CLASS_DIV_FULL_WIDTH}>
      <Stack direction="horizontal" gap={3}>
        <Scrap tooltip="Scrap (give)" value={EXCHANGE_SCRAP} />

        <ArrowRight />

        <Coins tooltip="Coins (receive)" value={EXCHANGE_COIN} />
      </Stack>

      <Stack direction="horizontal" gap={3}>
        <SellButton handleClick={handleSellSingle} label="Sell" />

        <SellButton handleClick={handleSellAll} label="Sell all" />
      </Stack>
    </div>
  );
}
