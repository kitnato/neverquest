import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Progress } from "@neverquest/components/Encounter/Progress";
import { Stage } from "@neverquest/components/Encounter/Stage";
import { isShowing } from "@neverquest/state/isShowing";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function WildernessStatus() {
  const isShowingWildernessStatus = useRecoilValue(isShowing("wildernessStatus"));

  return (
    <Stack
      className={`my-1 ${
        isShowingWildernessStatus
          ? `visible ${getAnimationClass({ name: "flipInX" })}`
          : "invisible"
      }`}
      direction="horizontal"
      gap={5}
    >
      <Stage />

      <Progress />
    </Stack>
  );
}
