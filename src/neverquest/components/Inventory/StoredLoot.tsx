import Card from "react-bootstrap/Card";
import { useRecoilValue } from "recoil";

import LootDisplay from "neverquest/components/Loot/LootDisplay";
import { UIAnimationType } from "neverquest/env";
import { showAether, showCoins, showScrap } from "neverquest/state/show";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function StoredLoot() {
  const showAetherValue = useRecoilValue(showAether);
  const showCoinsValue = useRecoilValue(showCoins);
  const showScrapValue = useRecoilValue(showScrap);

  if (!showAetherValue && !showCoinsValue && !showScrapValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass(UIAnimationType.FlipInX)}>
      <Card.Body>
        <LootDisplay />
      </Card.Body>
    </Card>
  );
}
