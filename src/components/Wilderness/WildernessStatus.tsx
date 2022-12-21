import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import WildernessLevel from "@neverquest/components/Wilderness/WildernessLevel";
import WildernessProgress from "@neverquest/components/Wilderness/WildernessProgress";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const showWildernessStatusValue = useRecoilValue(isShowing(ShowingType.WildernessStatus));

  return (
    <Stack
      className={
        showWildernessStatusValue ? getAnimationClass({ type: AnimationType.FlipInX }) : ""
      }
      direction="horizontal"
      gap={5}
      style={{ visibility: showWildernessStatusValue ? "visible" : "hidden" }}
    >
      <WildernessLevel />

      <WildernessProgress />
    </Stack>
  );
}
