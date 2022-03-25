import Card from "react-bootstrap/Card";
import { useRecoilValue } from "recoil";

import LootDisplay from "neverquest/components/Loot/LootDisplay";
import { show } from "neverquest/state/global";

export default function Resources() {
  const { aether, coins, scrap } = useRecoilValue(show);

  if (!aether && !coins && !scrap) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <LootDisplay />
      </Card.Body>
    </Card>
  );
}
