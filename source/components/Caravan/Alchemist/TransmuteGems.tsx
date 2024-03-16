import { nanoid } from "nanoid"
import { type SetStateAction, useEffect, useState } from "react"
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { SelectGem } from "@neverquest/components/Caravan/Alchemist/SelectGem"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { TRANSMUTATION } from "@neverquest/data/caravan"
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { GEM_BASE } from "@neverquest/data/items"
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { inventory } from "@neverquest/state/inventory"
import { essence } from "@neverquest/state/resources"
import { isGemItem } from "@neverquest/types/type-guards"
import { GEM_TYPES, type Gem } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

export function TransmuteGems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory)
  const essenceValue = useRecoilValue(essence)

  const [source, setSource] = useState<Gem>(`ruby`)
  const [result, setResult] = useState<Gem>(`sapphire`)

  const acquireItem = useAcquireItem()
  const progressQuest = useProgressQuest()
  const transactEssence = useTransactEssence()

  const { gemCost, gemYield, price } = TRANSMUTATION
  const gems = stackItems(
    inventoryValue
      .filter(isGemItem)
      .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
  )
  const transmutation = { amethyst: 0, ruby: 0, sapphire: 0 }

  for (const gem of GEM_TYPES) {
    transmutation[gem] = gems.find(({ item: { name } }) => name === gem)?.amount ?? 0
  }

  const hasStock = transmutation[source] >= gemCost
  const isAffordable = price <= essenceValue
  const canTransmute = hasStock && isAffordable

  const onSelect = (setSelection: (value: SetStateAction<Gem>) => void) => (gem: Gem) => {
    setSelection(gem)
  }

  useEffect(() => {
    if (source === result) {
      const gem = GEM_TYPES.find((gem) => gem !== source)

      if (gem) {
        setResult(gem)
      }
    }
  }, [result, source])

  return (
    <Stack gap={3}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <SelectGem gem={source} onSelect={onSelect(setSource)} />

        <IconImage Icon={IconTransmute} />

        <SelectGem gem={result} omit={source} onSelect={onSelect(setResult)} />
      </div>

      <Stack className="justify-content-center" direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Cost">
          <span>{formatNumber({ value: price })}</span>
        </IconDisplay>

        <OverlayTrigger
          overlay={
            <Tooltip>
              <Stack>
                {!hasStock && <span>Insufficient source gems.</span>}

                {!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}
              </Stack>
            </Tooltip>
          }
          placement="bottom"
          trigger={canTransmute ? [] : POPOVER_TRIGGER}
        >
          <div>
            <Button
              disabled={!canTransmute}
              onClick={() => {
                if (canTransmute) {
                  const gemIDs = new Set(
                    inventoryValue
                      .filter((item) => isGemItem(item) && item.name === source)
                      .map(({ ID }) => ID)
                      .slice(0, gemCost),
                  )

                  setInventory((currentInventory) =>
                    currentInventory.filter(({ ID }) => !gemIDs.has(ID)),
                  )

                  for (let yieldedGems = 0; yieldedGems < gemYield; yieldedGems++) {
                    acquireItem({
                      ...GEM_BASE,
                      ID: nanoid(),
                      name: result,
                    })
                  }

                  transactEssence(-price)

                  progressQuest({ quest: `gemsTransmuting` })
                }
              }}
              variant="outline-dark"
            >
              <span>Transmute</span>
            </Button>
          </div>
        </OverlayTrigger>
      </Stack>
    </Stack>
  )
}
