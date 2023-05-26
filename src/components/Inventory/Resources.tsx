import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resources() {
  const isShowingCoins = useRecoilValue(isShowing(Showing.Coins));
  const isShowingEssence = useRecoilValue(isShowing(Showing.Essence));
  const isShowingScrap = useRecoilValue(isShowing(Showing.Scrap));

  if (!isShowingEssence && !isShowingCoins && !isShowingScrap) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: "flipInX" })}>
      <Card.Body>
        <ResourceDisplay />
      </Card.Body>
    </Card>
  );
}
