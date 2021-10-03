import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import Progress from "components/Progress";
import progressIcon from "icons/stairs.svg";
import { level, progress, progressMax, show } from "state/global";

export default function LevelProgress() {
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const showValue = useRecoilValue(show);

  if (!showValue.levelProgress) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={progressIcon} tooltip="Progress" />

      <span>{levelValue}</span>

      <Progress
        label={`${progressValue}/${progressMaxValue}`}
        value={(progressValue / progressMaxValue) * 100}
        variant="secondary"
      />
    </div>
  );
}
