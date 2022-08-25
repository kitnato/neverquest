import Card from "react-bootstrap/Card";
import { useRecoilValue } from "recoil";

import ResourceDisplay from "@neverquest/components/Resource/ResourceDisplay";
import { isShowing } from "@neverquest/state/isShowing";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const showCoinsValue = useRecoilValue(isShowing(ShowingType.Coins));
  const showEssenceValue = useRecoilValue(isShowing(ShowingType.Essence));
  const showScrapValue = useRecoilValue(isShowing(ShowingType.Scrap));

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
