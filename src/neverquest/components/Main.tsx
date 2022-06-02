import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import Character from "neverquest/components/Character";
import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import Control from "neverquest/components/Control";
import Encounter from "neverquest/components/Encounter";
import Location from "neverquest/components/Location";
import WildernessProgress from "neverquest/components/Wilderness/WildernessProgress";
import useReset from "neverquest/hooks/useReset";
import { gameOver } from "neverquest/state/global";
import { reservesInitial } from "neverquest/state/reserves";

export default function Main() {
  const gameOverValue = useAtomValue(gameOver);
  const initializeReserves = useSetAtom(reservesInitial);

  const [showGameOver, setShowGameOver] = useState(true);

  const reset = useReset();

  useEffect(() => {
    initializeReserves();
  }, []);

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
        confirmationLabel="Reset"
        onConfirm={reset}
        message="Start a new quest?"
        setHide={() => setShowGameOver(false)}
        show={showGameOver && gameOverValue}
        title="You are dead."
      />
    </Stack>
  );
}
