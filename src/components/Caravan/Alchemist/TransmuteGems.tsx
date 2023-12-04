import { nanoid } from "nanoid";
import { plural } from "pluralize";
import { type SetStateAction, useEffect, useState } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { SelectGem } from "@neverquest/components/Caravan/Alchemist/SelectGem";
import { IconImage } from "@neverquest/components/IconImage";
import { TRANSMUTE_COST } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { GEM_BASE } from "@neverquest/data/items";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import IconTransmute from "@neverquest/icons/transmute.svg?react";
import { inventory } from "@neverquest/state/inventory";
import { isGemItem } from "@neverquest/types/type-guards";
import { GEM_TYPES, type Gem } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

export function TransmuteGems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);

  const [source, setSource] = useState<Gem>("ruby");
  const [result, setResult] = useState<Gem>("sapphire");

  const acquireItem = useAcquireItem();
  const progressQuest = useProgressQuest();

  const gems = stackItems(
    inventoryValue
      .filter(isGemItem)
      .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
  );
  const transmutation = { ruby: 0, sapphire: 0, topaz: 0 };

  for (const gem of GEM_TYPES) {
    transmutation[gem] = gems.find(({ item: { name } }) => name === gem)?.amount ?? 0;
  }

  const isAffordable = transmutation[source] >= TRANSMUTE_COST;

  const onSelect = (setSelection: (value: SetStateAction<Gem>) => void) => (gem: Gem) => {
    setSelection(gem);
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
    <Stack gap={3}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <SelectGem gem={source} onSelect={onSelect(setSource)} />

        <IconImage Icon={IconTransmute} />

        <SelectGem gem={result} omit={source} onSelect={onSelect(setResult)} />
      </div>

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
                const gemIDs = new Set(
                  inventoryValue
                    .filter((item) => isGemItem(item) && item.name === source)
                    .map(({ ID }) => ID)
                    .slice(0, TRANSMUTE_COST),
                );

                setInventory((currentInventory) =>
                  currentInventory.filter(({ ID }) => !gemIDs.has(ID)),
                );

                acquireItem({
                  ...GEM_BASE,
                  ID: nanoid(),
                  name: result,
                });

                progressQuest({ quest: "gemsTransmuting" });
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
