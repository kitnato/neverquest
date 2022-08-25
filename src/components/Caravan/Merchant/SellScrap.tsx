import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Coins from "@neverquest/components/Resource/Coins";
import Scrap from "@neverquest/components/Resource/Scrap";
import { EXCHANGE_COIN, EXCHANGE_SCRAP } from "@neverquest/constants/caravan";
import { scrap } from "@neverquest/state/resources";
import { resourcesBalance } from "@neverquest/state/transactions";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const scrapValue = useRecoilValue(scrap);
  const balanceResources = useSetRecoilState(resourcesBalance);

  const canSell = scrapValue >= EXCHANGE_SCRAP;

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
      <Stack direction="horizontal" gap={3}>
        <Scrap tooltip="Scrap (give)" value={EXCHANGE_SCRAP} />

        <ArrowRight />

        <Coins tooltip="Coins (receive)" value={EXCHANGE_COIN} />
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
                coinsDifference: EXCHANGE_COIN,
                scrapDifference: -EXCHANGE_SCRAP,
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
