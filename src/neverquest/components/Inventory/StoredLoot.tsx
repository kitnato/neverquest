import Card from "react-bootstrap/Card";
import { useAtomValue } from "jotai";

import ResourceDisplay from "neverquest/components/Resource/ResourceDisplay";
import { showAether, showCoins, showScrap } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function StoredLoot() {
  const showAetherValue = useAtomValue(showAether);
  const showCoinsValue = useAtomValue(showCoins);
  const showScrapValue = useAtomValue(showScrap);

  if (!showAetherValue && !showCoinsValue && !showScrapValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass(AnimationType.FlipInX)}>
      <Card.Body>
        <ResourceDisplay />
      </Card.Body>
    </Card>
  );
}
