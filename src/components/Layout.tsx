import { Col, Row, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { Character } from "@neverquest/components/Character";
import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { Control } from "@neverquest/components/Controls";
import { Encounter } from "@neverquest/components/Encounter";
import { Location } from "@neverquest/components/Location";
import { Masteries } from "@neverquest/components/Masteries";
import { WildernessStatus } from "@neverquest/components/Wilderness/WildernessStatus";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useReset } from "@neverquest/state/SeedContext";
import { ShowingType } from "@neverquest/types/enums";

export function Layout() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing(ShowingType.GameOver));

  const reset = useReset();

  return (
    <>
      <Row>
        <Col>
          <Stack gap={3}>
            <Location />

            <div style={{ zIndex: 1048 }}>
              <Character />
            </div>

            <Masteries />
          </Stack>
        </Col>

        <Col xs="auto">
          <Control />
        </Col>

        <Col>
          <Stack gap={3}>
            <WildernessStatus />

            <Encounter />
          </Stack>
        </Col>
      </Row>

      <ConfirmationDialog
        confirmationLabel="Restart"
        message="Start a new quest?"
        onConfirm={reset}
        setHide={() => setIsShowingGameOver(false)}
        show={isGameOverValue && isShowingGameOver}
        title="Death has come."
      />
    </>
  );
}
