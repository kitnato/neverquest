import { nanoid } from "nanoid";
import { FormSelect, Stack } from "react-bootstrap";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { TRANSMUTE_COST, TRANSMUTE_YIELD } from "@neverquest/data/caravan";
import { GEM_BASE } from "@neverquest/data/inventory";
import { GEM_TYPES, type Gem } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SelectGem({
  gem,
  handleSelect,
  omit,
}: {
  gem: Gem;
  handleSelect: (gem: Gem) => void;
  omit?: Gem;
}) {
  return (
    <Stack gap={3}>
      <FormSelect
        onChange={({ target: { value } }) => {
          handleSelect(value as Gem);
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

      <ItemDisplay
        hideDescription
        item={{
          ...GEM_BASE,
          id: nanoid(),
          type: gem,
        }}
        stack={omit === undefined ? TRANSMUTE_COST : TRANSMUTE_YIELD}
      />
    </Stack>
  );
}
