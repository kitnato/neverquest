import { useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import IconImage from "@neverquest/components/IconImage";
import Monster from "@neverquest/components/Monster";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import { ReactComponent as Icon } from "@neverquest/icons/crossed-bones.svg";
import { isLevelCompleted, isLevelStarted, progress } from "@neverquest/state/encounter";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const setIsLevelStarted = useSetRecoilState(isLevelStarted);
  // Progress needs to be tracked here so that a new monster is created whenever there is level progression.
  const progressValue = useRecoilValue(progress);

  const createMonster = useCreateMonster();

  useEffect(() => {
    if (isLevelCompletedValue) {
      setIsLevelStarted(false);
    } else {
      createMonster();
    }
  }, [createMonster, isLevelCompletedValue, progressValue, setIsLevelStarted]);

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
