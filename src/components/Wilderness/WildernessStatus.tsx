import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Progress } from "@neverquest/components/Wilderness/Progress";
import { Stage } from "@neverquest/components/Wilderness/Stage";
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
      <Stage />

      <Progress />
    </Stack>
  );
}
