import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Equipment from "neverquest/components/Inventory/Equipment";
import LootDisplay from "neverquest/components/Loot/LootDisplay";
import { show } from "neverquest/state/global";

export default function Inventory() {
  const showValue = useRecoilValue(show);

  if (!showValue.inventory) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <LootDisplay />

          <Equipment />
        </Stack>
      </Card.Body>
    </Card>
  );
}
