import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/crossed-bones.svg";
import Monster from "neverquest/components/Monster";
import { isLevelCompleted } from "neverquest/state/global";

export default function Wilderness() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  return (
    <Stack gap={3}>
      {isLevelCompletedValue ? (
        <Card>
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
