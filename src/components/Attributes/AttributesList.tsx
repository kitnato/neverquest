import { Stack } from "react-bootstrap";

import { AttributeDisplay } from "@neverquest/components/Attributes/AttributeDisplay";
import { ATTRIBUTES_ORDER } from "@neverquest/data/attributes";

export function AttributesList() {
  return (
    <Stack gap={3}>
      {ATTRIBUTES_ORDER.map((type, index) => (
        <AttributeDisplay key={index} type={type} />
      ))}
    </Stack>
  );
}
