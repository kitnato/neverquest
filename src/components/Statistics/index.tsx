import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Defense } from "@neverquest/components/Statistics/Defense";
import { Offense } from "@neverquest/components/Statistics/Offense";
import { Support } from "@neverquest/components/Statistics/Support";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Statistics() {
  const isShowingStatistics = useRecoilValue(isShowing(ShowingType.Statistics));

  if (!isShowingStatistics) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <Stack gap={3}>
          <Offense />

          <Defense />

          <Support />
        </Stack>
      </Card.Body>
    </Card>
  );
}
