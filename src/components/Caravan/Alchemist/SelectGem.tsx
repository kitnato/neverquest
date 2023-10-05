import { FormSelect, Stack } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TRANSMUTE_COST, TRANSMUTE_YIELD } from "@neverquest/data/caravan";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
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
    <Stack direction="horizontal" gap={1}>
      <IconDisplay
        contents={
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
        }
        Icon={IconGem}
        tooltip="Gem"
      />

      <span>x{omit === undefined ? TRANSMUTE_COST : TRANSMUTE_YIELD}</span>
    </Stack>
  );
}
