import React from "react";
import { useRecoilValue } from "recoil";
import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { level, progress } from "state/atoms";
import { progressMax } from "state/selectors";

import progressIcon from "icons/stairs.svg";

export default function LevelProgress() {
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);

  return (
    <WithIcon icon={progressIcon} alt="Progress">
      <span className="mr-3">{levelValue}</span>

      <Progress
        value={(progressValue / progressMaxValue) * 100}
        label={`${progressValue}/${progressMaxValue}`}
      />
    </WithIcon>
  );
}
