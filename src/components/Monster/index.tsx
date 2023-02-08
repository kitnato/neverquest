import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStatus } from "@neverquest/components/Monster/MonsterStatus";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { ReactComponent as Icon } from "@neverquest/icons/evil-eyes.svg";
import { isLevelStarted } from "@neverquest/state/encounter";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Monster() {
  const isLevelStartedValue = useRecoilValue(isLevelStarted);

  if (isLevelStartedValue) {
    return <MonsterStatus />;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <IconDisplay
          contents={<span className="fst-italic">The darkness stirs.</span>}
          Icon={Icon}
          tooltip={LABEL_UNKNOWN}
        />
      </Card.Body>
    </Card>
  );
}
