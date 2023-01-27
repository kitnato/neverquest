import Stack from "react-bootstrap/Stack";

import { Attribute } from "@neverquest/components/Attributes/Attribute";
import { ATTRIBUTES_ORDER } from "@neverquest/data/attributes";

export function AttributesList() {
  return (
    <Stack gap={3}>
      {ATTRIBUTES_ORDER.map((type, index) => (
        <Attribute key={index} type={type} />
      ))}
    </Stack>
  );
}
