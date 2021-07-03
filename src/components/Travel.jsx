import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { level, mode } from "state/atoms";
import { levelCompleted, location } from "state/selectors";

export default function Travel() {
  const levelValue = useRecoilValue(level);
  const modeValue = useRecoilValue(mode);
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const changeLocation = useSetRecoilState(location);
  const isWilderness = modeValue === 0;
  const destination = (() => {
    if (levelValue > 1) {
      if (isWilderness) {
        return "caravan";
      }
      return "wilderness";
    }

    return isWilderness ? "???" : "wilderness";
  })();

  return (
    <Button
      block
      className={!isLevelCompleted && "d-none"}
      onClick={changeLocation}
      variant="outline-dark"
    >
      {`${isWilderness ? "Go to" : "Return to"} ${destination}`}
    </Button>
  );
}
