import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/crossed-bones.svg";
import Monster from "neverquest/components/Monster";
import { isLevelCompleted } from "neverquest/state/global";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Wilderness() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  return (
    <Stack gap={3}>
      {isLevelCompletedValue ? (
        <Card className={getAnimationClass(UIAnimationType.FlipInX)}>
          <Card.Body>
            <Stack direction="horizontal" gap={5}>
              <ImageIcon icon={icon} tooltip="Monster remains" />

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
