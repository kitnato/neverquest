import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/crossed-bones.svg";
import Monster from "components/Monster";
import { isLevelCompleted } from "state/global";

export default function Wilderness() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  return (
    <Stack gap={3}>
      {isLevelCompletedValue ? (
        <Card>
          <Card.Body>
            <Stack direction="horizontal" gap={3}>
              <ImageIcon icon={icon} tooltip="Remains" />

              <span style={{ fontStyle: "italic" }}>Everything is dead.</span>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <Monster />
      )}
    </Stack>
  );
}
