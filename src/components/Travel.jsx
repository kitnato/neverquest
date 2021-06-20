import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { level, progress, mode } from "state/atoms";
import { progressMax } from "state/selectors";

export default function Travel() {
  const levelValue = useRecoilValue(level);
  const modeValue = useRecoilValue(mode);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const destination = (() => {
    if (levelValue === 1) {
      return "Go to ???";
    }

    if (modeValue === "exploration") {
      return "Go to Caravan";
    }

    return "Go exploring";
  })();

  return (
    <Button variant="primary" disabled={progressValue < progressMaxValue} block>
      {destination}
    </Button>
  );
}
