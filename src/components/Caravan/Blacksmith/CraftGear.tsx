import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { coins, scrap } from "@neverquest/state/resources";
import type { Gear } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export function CraftGear({ gear }: { gear: Gear }) {
  const coinsValue = useRecoilValue(coins);
  const scrapValue = useRecoilValue(scrap);
  const setBlacksmithInventory = useSetRecoilState(blacksmithInventory);

  const transactResources = useTransactResources();

  const { coinPrice, scrapPrice } = gear;
  const hasCoins = coinPrice <= coinsValue;
  const hasScrap = scrapPrice <= scrapValue;
  const isCraftable = hasCoins && hasScrap;

  const handleCraft = () => {
    transactResources({ coinsDifference: -coinPrice, scrapDifference: -scrapPrice });

    if (isArmor(gear)) {
      setBlacksmithInventory((current) => ({ ...current, armor: gear }));
    }

    if (isShield(gear)) {
      setBlacksmithInventory((current) => ({ ...current, shield: gear }));
    }

    if (isWeapon(gear)) {
      setBlacksmithInventory((current) => ({ ...current, weapon: gear }));
    }
  };

  return (
    <Stack direction="horizontal" gap={5}>
      <ResourceDisplay tooltip="Cost (scrap)" type="scrap" value={scrapPrice} />

      <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {!hasCoins && <div>Not enough coins!</div>}
            {!hasScrap && <div>Not enough scrap!</div>}
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
