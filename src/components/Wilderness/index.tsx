import { useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import IconImage from "@neverquest/components/IconImage";
import Monster from "@neverquest/components/Monster";
import { ReactComponent as Icon } from "@neverquest/icons/crossed-bones.svg";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { isLevelStarted } from "@neverquest/state/monster";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const [isLevelStartedValue, setLevelStarted] = useRecoilState(isLevelStarted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  useEffect(() => {
    if (isLevelStartedValue && isLevelCompletedValue) {
      setLevelStarted(false);
    }
  });

  return (
    <Stack gap={3}>
      {isLevelCompletedValue ? (
        <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
          <Card.Body>
            <Stack direction="horizontal" gap={5}>
              <IconImage Icon={Icon} tooltip="Monster remains" />

              <span className="fst-italic">Everything is dead.</span>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <Monster />
      )}
    </Stack>
  );
}
