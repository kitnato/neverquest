import { useState } from "react";
import { FormSelect } from "react-bootstrap";

import { RESOURCE_TYPES, type Resource } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SelectResource() {
  const [resource, setResource] = useState<Resource>("coins");

  return (
    <FormSelect
      onChange={({ target: { value } }) => setResource(value as Resource)}
      value={resource}
    >
      {RESOURCE_TYPES.map((resource) => (
        <option key={resource} value={resource}>
          {capitalizeAll(resource)}
        </option>
      ))}
    </FormSelect>
  );
}
