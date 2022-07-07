import { useAtomValue } from "jotai";
import Card from "react-bootstrap/Card";

import ResourceDisplay from "neverquest/components/Resource/ResourceDisplay";
import { showCoins, showEssence, showScrap } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Resources() {
  const showCoinsValue = useAtomValue(showCoins);
  const showEssenceValue = useAtomValue(showEssence);
  const showScrapValue = useAtomValue(showScrap);

  if (!showEssenceValue && !showCoinsValue && !showScrapValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <ResourceDisplay />
      </Card.Body>
    </Card>
  );
}
