import Card from "react-bootstrap/Card";
import { useRecoilValue } from "recoil";

import LootDisplay from "neverquest/components/Loot/LootDisplay";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function Resources() {
  const showAetherValue = useRecoilValue(showAether);
  const showCoinsValue = useRecoilValue(showCoins);
  const showScrapValue = useRecoilValue(showScrap);

  if (!showAetherValue && !showCoinsValue && !showScrapValue) {
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
