import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coins, scrap } from "@neverquest/state/resources";

export function CraftGear({
  coinPrice,
  onCraft,
  scrapPrice,
}: {
  coinPrice: number;
  onCraft: () => void;
  scrapPrice: number;
}) {
  const coinsValue = useRecoilValue(coins);
  const scrapValue = useRecoilValue(scrap);

  const transactResources = useTransactResources();

  const hasCoins = coinPrice <= coinsValue;
  const hasScrap = scrapPrice <= scrapValue;
  const isCraftable = hasCoins && hasScrap;

  const handleCraft = () => {
    onCraft();
    transactResources({ coinsDifference: -coinPrice, scrapDifference: -scrapPrice });
  };

  return (
    <Stack direction="horizontal" gap={5}>
      <ResourceDisplay tooltip="Cost (scrap)" type="scrap" value={scrapPrice} />

      <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {!hasCoins && <div>Insufficient coins!</div>}
            {!hasScrap && <div>Insufficient scrap!</div>}
          </Tooltip>
        }
        trigger={isCraftable ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            className="w-100"
            disabled={!isCraftable}
            onClick={handleCraft}
            variant="outline-dark"
          >
            Craft
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
