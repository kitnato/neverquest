import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Progress } from "@neverquest/components/Wilderness/Progress";
import { Stage } from "@neverquest/components/Wilderness/Stage";
import { isShowing } from "@neverquest/state/isShowing";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function WildernessStatus() {
  const isShowingWildernessStatus = useRecoilValue(isShowing("wildernessStatus"));

  return (
    <Stack
      className={
        isShowingWildernessStatus ? ` ${getAnimationClass({ type: "flipInX" })}` : undefined
      }
      direction="horizontal"
      gap={5}
      style={{
        marginBottom: 4,
        marginTop: 4,
        visibility: isShowingWildernessStatus ? "visible" : "hidden",
      }}
    >
      <Stage />

      <Progress />
    </Stack>
  );
}
