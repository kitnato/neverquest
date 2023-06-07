import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { isShowing } from "@neverquest/state/isShowing";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resources() {
  const isShowingCoins = useRecoilValue(isShowing("coins"));
  const isShowingEssence = useRecoilValue(isShowing("essence"));
  const isShowingScrap = useRecoilValue(isShowing("scrap"));

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
