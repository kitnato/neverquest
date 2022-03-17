import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/stairs.svg";
import { isWilderness, level, progress, progressMax, show } from "neverquest/state/global";

export default function LevelProgress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const { levelProgress } = useRecoilValue(show);

  if (!levelProgress) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Progress" />

      <span>{levelValue}</span>

      {isWildernessValue && (
        <Progress
          label={`${progressValue}/${progressMaxValue}`}
          value={(progressValue / progressMaxValue) * 100}
          variant={UIVariant.Primary}
        />
      )}
    </Stack>
  );
}
