import React from "react";
import { useRecoilValue } from "recoil";
import ProgressBar from "react-bootstrap/ProgressBar";

import { progress, progressMaximum } from "state/atoms";

export default function Progress() {
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  return (
    <ProgressBar
      now={(progressValue / progressMaximumValue) * 100}
      label={`${progressValue}/${progressMaximumValue}`}
      className="my-3"
    />
  );
}
