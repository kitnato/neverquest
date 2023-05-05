import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Monster } from "@neverquest/components/Monster";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconLurking } from "@neverquest/icons/monster-lurking.svg";
import { ReactComponent as IconRemains } from "@neverquest/icons/monster-remains.svg";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Wilderness() {
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  if (isLevelCompletedValue) {
    return (
      <Card className={getAnimationClass({ type: "flipInX" })}>
        <Card.Body>
          <IconDisplay
            contents={<span className="fst-italic">Everything is dead.</span>}
            Icon={IconRemains}
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
    <Card className={getAnimationClass({ type: "flipInX" })}>
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
