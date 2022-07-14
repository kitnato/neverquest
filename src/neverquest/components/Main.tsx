import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";

import Character from "neverquest/components/Character";
import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import Control from "neverquest/components/Control";
import Encounter from "neverquest/components/Encounter";
import Location from "neverquest/components/Location";
import WildernessProgress from "neverquest/components/Wilderness/WildernessProgress";
import useReset from "neverquest/hooks/useReset";
import { gameOver } from "neverquest/state/global";
import { showGameOver } from "neverquest/state/show";

export default function Main() {
  const [showGameOverValue, setShowGameOver] = useAtom(showGameOver);
  const isGameOver = useAtomValue(gameOver);

  const reset = useReset();

  useEffect(reset, []);

  return (
    <Stack gap={3}>
      <Row>
        <Col>
          <Location />
        </Col>

        <Col style={{ width: 80 }} xs="auto" />

        <Col>
          <WildernessProgress />
        </Col>
      </Row>

      <Row>
        <Col style={{ zIndex: 1050 }}>
          <Character />
        </Col>

        <Col xs="auto">
          <Control />
        </Col>

        <Col>
          <Encounter />
        </Col>
      </Row>

      <ConfirmationDialog
        confirmationLabel="Restart"
        onConfirm={reset}
        message="Start a new quest?"
        setHide={() => setShowGameOver(false)}
        show={isGameOver && showGameOverValue}
        title="You are dead."
      />
    </Stack>
  );
}
