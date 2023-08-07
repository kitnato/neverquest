import { FormSelect, Stack } from "react-bootstrap";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { TRANSMUTE_COST, TRANSMUTE_YIELD } from "@neverquest/data/caravan";
import { RESOURCE_TYPES, type Resource } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SelectResource({
  handleSelect,
  omit,
  resource,
}: {
  handleSelect: (resource: Resource) => void;
  omit?: Resource;
  resource: Resource;
}) {
  return (
    <Stack gap={3}>
      <FormSelect
        onChange={({ target: { value } }) => {
          handleSelect(value as Resource);
        }}
        value={resource}
      >
        {RESOURCE_TYPES.map(
          (resource) =>
            omit !== resource && (
              <option key={resource} value={resource}>
                {capitalizeAll(resource)}
              </option>
            ),
        )}
      </FormSelect>

      <ResourceDisplay
        type={resource}
        value={omit === undefined ? TRANSMUTE_COST : TRANSMUTE_YIELD}
      />
    </Stack>
  );
}
