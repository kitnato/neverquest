import { useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import IconImage from "@neverquest/components/IconImage";
import Monster from "@neverquest/components/Monster";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import { ReactComponent as Icon } from "@neverquest/icons/crossed-bones.svg";
import { isLevelCompleted, progress } from "@neverquest/state/encounter";
import { isLevelStarted } from "@neverquest/state/monster";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const progressValue = useRecoilValue(progress);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const setLevelStarted = useSetRecoilState(isLevelStarted);

  const createMonster = useCreateMonster();

  useEffect(() => {
    if (isLevelCompletedValue) {
      setLevelStarted(false);
    } else {
      createMonster();
    }
  }, [createMonster, isLevelCompletedValue, progressValue, setLevelStarted]);

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
