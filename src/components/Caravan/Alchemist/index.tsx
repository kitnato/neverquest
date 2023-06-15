import { type SetStateAction, useEffect, useState } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SelectResource } from "@neverquest/components/Caravan/Alchemist/SelectResource";
import { IconImage } from "@neverquest/components/IconImage";
import { TRANSMUTE_COST, TRANSMUTE_YIELD } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconTransmute } from "@neverquest/icons/transmute.svg";
import { coins, essence, scrap } from "@neverquest/state/resources";
import type { ResourceTransaction } from "@neverquest/types/props";
import { RESOURCE_TYPES, type Resource } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Alchemist() {
  const coinsValue = useRecoilValue(coins);
  const essenceValue = useRecoilValue(essence);
  const scrapValue = useRecoilValue(scrap);

  const [source, setSource] = useState<Resource>("essence");
  const [result, setResult] = useState<Resource>("scrap");

  const transactResources = useTransactResources();

  const transmutation: Record<
    Resource,
    { resource: number; transaction: keyof ResourceTransaction }
  > = {
    coins: { resource: coinsValue, transaction: "coinsDifference" },
    essence: { resource: essenceValue, transaction: "essenceDifference" },
    scrap: { resource: scrapValue, transaction: "scrapDifference" },
  };
  const isAffordable = transmutation[source].resource >= TRANSMUTE_COST;

  const handleSelect =
    (setSelection: (value: SetStateAction<Resource>) => void) => (resource: Resource) =>
      setSelection(resource);
  const handleTransmute = () => {
    if (isAffordable) {
      transactResources({
        [transmutation[source].transaction]: -TRANSMUTE_COST,
        [transmutation[result].transaction]: TRANSMUTE_YIELD,
      });
    }
  };

  useEffect(() => {
    if (source === result) {
      const resource = RESOURCE_TYPES.find((resource) => resource !== source);

      if (resource) {
        setResult(resource);
      }
    }
  }, [result, source]);

  return (
    <Stack gap={3}>
      <h6>Transmute resources</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Stack direction="horizontal" gap={5}>
          <SelectResource handleSelect={handleSelect(setSource)} resource={source} />

          <IconImage Icon={IconTransmute} />

          <SelectResource handleSelect={handleSelect(setResult)} omit={source} resource={result} />
        </Stack>

        <OverlayTrigger
          overlay={<Tooltip>{`Not enough ${source}!`}</Tooltip>}
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span>
            <Button disabled={!isAffordable} onClick={handleTransmute} variant="outline-dark">
              Transmute
            </Button>
          </span>
        </OverlayTrigger>
      </div>
    </Stack>
  );
}
