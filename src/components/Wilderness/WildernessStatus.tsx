import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { WildernessLevel } from "@neverquest/components/Wilderness/WildernessLevel";
import { WildernessProgress } from "@neverquest/components/Wilderness/WildernessProgress";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function WildernessStatus() {
  const isShowingWildernessStatus = useRecoilValue(isShowing(Showing.WildernessStatus));

  return (
    <Stack
      className={`w-100${
        isShowingWildernessStatus ? ` ${getAnimationClass({ type: "flipInX" })}` : ""
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
