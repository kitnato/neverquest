import { useContext, useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import Character from "@neverquest/components/Character";
import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import Control from "@neverquest/components/Control";
import Encounter from "@neverquest/components/Encounter";
import Location from "@neverquest/components/Location";
import WildernessStatus from "@neverquest/components/Wilderness/WildernessStatus";
import { isGameOver } from "@neverquest/state/global";
import { SeedContext } from "@neverquest/state/SeedContext";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function Main() {
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing(ShowingType.GameOver));
  const isGameOverValue = useRecoilValue(isGameOver);

  const resetSeedContext = useContext(SeedContext);

  useEffect(() => {
    // Remove any route or parameter pollution in URL.
    window.history.replaceState({}, document.title, "/");
  }, []);

  return (
    <Stack gap={3}>
      <Row>
        <Col>
          <Location />
        </Col>

        <Col style={{ width: 80 }} xs="auto" />

        <Col>
          <WildernessStatus />
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
        onConfirm={resetSeedContext}
        message="Start a new quest?"
        setHide={() => setIsShowingGameOver(false)}
        show={isGameOverValue && isShowingGameOver}
        title="You are dead."
      />
    </Stack>
  );
}
