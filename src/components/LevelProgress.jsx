import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import progressIcon from "icons/stairs.svg";
import { level, progress, progressMax } from "state/global";

export default function LevelProgress() {
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);

  return (
    <WithIcon icon={progressIcon} alt="Progress">
      <span className="mr-3">{levelValue}</span>

      <Progress
        label={`${progressValue}/${progressMaxValue}`}
        value={(progressValue / progressMaxValue) * 100}
        variant="secondary"
      />
    </WithIcon>
  );
}
