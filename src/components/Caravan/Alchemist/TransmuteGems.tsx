import { nanoid } from "nanoid";
import { plural } from "pluralize";
import { type SetStateAction, useEffect, useState } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { SelectGem } from "@neverquest/components/Caravan/Alchemist/SelectGem";
import { IconImage } from "@neverquest/components/IconImage";
import { TRANSMUTE_COST } from "@neverquest/data/caravan";
import { GEM_BASE } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import IconTransmute from "@neverquest/icons/transmute.svg?react";
import { inventory } from "@neverquest/state/inventory";
import { isGem } from "@neverquest/types/type-guards";
import { GEM_TYPES, type Gem } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

export function TransmuteGems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);

  const [source, setSource] = useState<Gem>("ruby");
  const [result, setResult] = useState<Gem>("sapphire");

  const acquireItem = useAcquireItem();

  const gems = stackItems(
    inventoryValue
      .filter(isGem)
      .sort((current1, current2) => current1.name.localeCompare(current2.name)),
  );
  const transmutation = GEM_TYPES.reduce(
    (aggregator, current) => ({
      ...aggregator,
      [current]: gems.find(({ item: { name } }) => name === current)?.stack ?? 0,
    }),
    { ruby: 0, sapphire: 0, topaz: 0 },
  );
  const isAffordable = transmutation[source] >= TRANSMUTE_COST;

  const onSelect = (setSelection: (value: SetStateAction<Gem>) => void) => (gem: Gem) =>
    setSelection(gem);

  useEffect(() => {
    if (source === result) {
      const gem = GEM_TYPES.find((gem) => gem !== source);

      if (gem) {
        setResult(gem);
      }
    }
  }, [result, source]);

  return (
    <Stack direction="horizontal" gap={5}>
      <SelectGem gem={source} onSelect={onSelect(setSource)} />

      <IconImage Icon={IconTransmute} />

      <SelectGem gem={result} omit={source} onSelect={onSelect(setResult)} />

      <OverlayTrigger
        overlay={<Tooltip>{`Insufficient ${plural(source)}.`}</Tooltip>}
        placement="bottom"
        trigger={isAffordable ? [] : ["hover", "focus"]}
      >
        <span className="mx-auto">
          <Button
            disabled={!isAffordable}
            onClick={() => {
              if (isAffordable) {
                const gemIDs = inventoryValue
                  .filter((current) => isGem(current) && current.name === source)
                  .map(({ id }) => id)
                  .slice(0, TRANSMUTE_COST);

                setInventory(inventoryValue.filter(({ id }) => !gemIDs.includes(id)));

                acquireItem({
                  ...GEM_BASE,
                  id: nanoid(),
                  name: result,
                });
              }
            }}
            variant="outline-dark"
          >
            Transmute
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
