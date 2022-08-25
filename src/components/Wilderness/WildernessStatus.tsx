import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import WildernessProgress from "@neverquest/components/Wilderness/WildernessProgress";
import WildernessLevel from "@neverquest/components/Wilderness/WildernessLevel";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const showWildernessStatusValue = useRecoilValue(isShowing(ShowingType.WildernessStatus));

  if (!showWildernessStatusValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={5}
    >
      <WildernessLevel />

      <WildernessProgress />
    </Stack>
  );
}
