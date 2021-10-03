import { useState } from "react";
import { useRecoilValue } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Character from "./components/Character";
import Encounter from "./components/Encounter";
import LevelProgress from "./components/LevelProgress";
import Location from "./components/Location";
import Reset from "./components/Reset";
import { gameOver } from "./state/global";

export default function Layout({ resetSeed }) {
  const gameOverValue = useRecoilValue(gameOver);
  const [showReset, setGameOverShow] = useState(true);

  return (
    <div className="spaced-vertical">
      <Row>
        <Col>
          <Location />
        </Col>

        <Col>
          <LevelProgress />
        </Col>
      </Row>

      <Row>
        <Col>
          <Character />
        </Col>

        <Col>
          <Encounter />
        </Col>
      </Row>

      <Reset
        message="Try again?"
        resetSeed={resetSeed}
        show={showReset && gameOverValue}
        setHide={() => setGameOverShow(false)}
        title="You are dead."
      />
    </div>
  );
}
