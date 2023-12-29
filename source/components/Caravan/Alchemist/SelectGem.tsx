import { FormSelect, Stack } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TRANSMUTE_COST, TRANSMUTE_YIELD } from "@neverquest/data/caravan";
import { GEMS } from "@neverquest/data/items";
import { GEM_TYPES, type Gem } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SelectGem({
  gem,
  omit,
  onSelect,
}: {
  gem: Gem;
  omit?: Gem;
  onSelect: (gem: Gem) => void;
}) {
  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={GEMS[gem].Icon} tooltip="Gem">
        <FormSelect
          onChange={({ target: { value } }) => {
            onSelect(value as Gem);
          }}
          value={gem}
        >
          {GEM_TYPES.map(
            (gem) =>
              omit !== gem && (
                <option key={gem} value={gem}>
                  {capitalizeAll(gem)}
                </option>
              ),
          )}
        </FormSelect>
      </IconDisplay>

      <span>x{omit === undefined ? TRANSMUTE_COST : TRANSMUTE_YIELD}</span>
    </Stack>
  );
}
