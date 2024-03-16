import { DropdownButton, DropdownItem, Stack } from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TRANSMUTATION } from "@neverquest/data/caravan"
import { GEMS } from "@neverquest/data/items"
import { GEM_TYPES, type Gem } from "@neverquest/types/unions"
import { capitalizeAll } from "@neverquest/utilities/formatters"

export function SelectGem({
  gem,
  omit,
  onSelect,
}: {
  gem: Gem;
  omit?: Gem;
  onSelect: (gem: Gem) => void;
}) {
  const { gemCost, gemYield } = TRANSMUTATION

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={GEMS[gem].Icon} tooltip="Gem">
        <DropdownButton
          onSelect={(key) => {
            if (key !== null) {
              onSelect(key as Gem)
            }
          }}
          title={capitalizeAll(gem)}
          variant="outline-dark"
        >
          {GEM_TYPES.map(
            (gemType) =>
              omit !== gemType && (
                <DropdownItem as="button" eventKey={gemType} key={gemType}>
                  <span>{capitalizeAll(gemType)}</span>
                </DropdownItem>
              ),
          )}
        </DropdownButton>
      </IconDisplay>

      <span>×{omit === undefined ? gemCost : gemYield}</span>
    </Stack>
  )
}
