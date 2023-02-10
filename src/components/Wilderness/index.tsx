import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Monster } from "@neverquest/components/Monster";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { ReactComponent as IconDead } from "@neverquest/icons/crossed-bones.svg";
import { ReactComponent as IconLurking } from "@neverquest/icons/evil-eyes.svg";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Wilderness() {
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  if (isLevelCompletedValue) {
    return (
      <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
        <Card.Body>
          <IconDisplay
            contents={<span className="fst-italic">Everything is dead.</span>}
            Icon={IconDead}
            isSpaced
            tooltip="Monster remains"
          />
        </Card.Body>
      </Card>
    );
  }

  if (isLevelStartedValue) {
    return <Monster />;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <IconDisplay
          contents={<span className="fst-italic">The darkness stirs.</span>}
          Icon={IconLurking}
          isSpaced
          tooltip={LABEL_UNKNOWN}
        />
      </Card.Body>
    </Card>
  );
}
