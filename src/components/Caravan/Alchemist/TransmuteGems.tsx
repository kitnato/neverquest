import { plural } from "pluralize";
import { type SetStateAction, useEffect, useState } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SelectGem } from "@neverquest/components/Caravan/Alchemist/SelectGem";
import { IconImage } from "@neverquest/components/IconImage";
import { TRANSMUTE_COST } from "@neverquest/data/caravan";
import { ReactComponent as IconTransmute } from "@neverquest/icons/transmute.svg";
import { inventory } from "@neverquest/state/inventory";
import { isGem } from "@neverquest/types/type-guards";
import { GEM_TYPES, type Gem } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

export function TransmuteGems() {
  const inventoryValue = useRecoilValue(inventory);

  const [source, setSource] = useState<Gem>("ruby");
  const [result, setResult] = useState<Gem>("sapphire");

  const gems = stackItems(
    inventoryValue.filter(isGem).sort((a, b) => a.name.localeCompare(b.name)),
  );

  const transmutation = GEM_TYPES.reduce(
    (aggregator, current) => ({
      ...aggregator,
      [current]: gems.find(({ item: { name }, stack }) => (name === current ? stack : 0)),
    }),
    { ruby: 0, sapphire: 0, topaz: 0 },
  );
  const isAffordable = transmutation[source] >= TRANSMUTE_COST;

  const handleSelect = (setSelection: (value: SetStateAction<Gem>) => void) => (gem: Gem) =>
    setSelection(gem);
  const handleTransmute = () => {
    if (isAffordable) {
      // TODO
    }
  };

  useEffect(() => {
    if (source === result) {
      const gem = GEM_TYPES.find((gem) => gem !== source);

      if (gem) {
        setResult(gem);
      }
    }
  }, [result, source]);

  return (
    <Stack className="mx-auto" gap={3}>
      <Stack direction="horizontal" gap={5}>
        <SelectGem gem={source} handleSelect={handleSelect(setSource)} />

        <IconImage Icon={IconTransmute} />

        <SelectGem gem={result} handleSelect={handleSelect(setResult)} omit={source} />
      </Stack>

      <OverlayTrigger
        overlay={<Tooltip>{`Insufficient ${plural(source)}.`}</Tooltip>}
        placement="bottom"
        trigger={isAffordable ? [] : ["hover", "focus"]}
      >
        <span className="mx-auto">
          <Button disabled={!isAffordable} onClick={handleTransmute} variant="outline-dark">
            Transmute
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
