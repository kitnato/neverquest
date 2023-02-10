import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { WildernessLevel } from "@neverquest/components/Wilderness/WildernessLevel";
import { WildernessProgress } from "@neverquest/components/Wilderness/WildernessProgress";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function WildernessStatus() {
  const isShowingWildernessStatus = useRecoilValue(isShowing(ShowingType.WildernessStatus));

  return (
    <Stack
      className={`w-100${
        isShowingWildernessStatus ? ` ${getAnimationClass({ type: AnimationType.FlipInX })}` : ""
      }`}
      direction="horizontal"
      gap={5}
      style={{ visibility: isShowingWildernessStatus ? "visible" : "hidden" }}
    >
      <WildernessLevel />

      <WildernessProgress />
    </Stack>
  );
}
