import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { level, mode } from "state/atoms";
import { levelCompleted } from "state/selectors";

export default function Travel() {
  const levelValue = useRecoilValue(level);
  const modeValue = useRecoilValue(mode);
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const destination = levelValue === 1 ? "???" : modeValue;

  return (
    <Button
      block
      className={!isLevelCompleted && "d-none"}
      variant="outline-dark"
    >
      Go to {destination}
    </Button>
  );
}
