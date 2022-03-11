import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Equipment from "components/Inventory/Equipment";
import LootDisplay from "components/Loot/LootDisplay";
import { show } from "state/global";

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
