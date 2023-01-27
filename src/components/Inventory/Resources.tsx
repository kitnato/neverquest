import Card from "react-bootstrap/Card";
import { useRecoilValue } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resource/ResourceDisplay";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resources() {
  const isShowingCoins = useRecoilValue(isShowing(ShowingType.Coins));
  const isShowingEssence = useRecoilValue(isShowing(ShowingType.Essence));
  const isShowingScrap = useRecoilValue(isShowing(ShowingType.Scrap));

  if (!isShowingEssence && !isShowingCoins && !isShowingScrap) {
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
