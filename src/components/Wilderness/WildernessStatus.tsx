import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import WildernessProgress from "@neverquest/components/Wilderness/WildernessProgress";
import WildernessLevel from "@neverquest/components/Wilderness/WildernessLevel";
import { showWildernessStatus } from "@neverquest/state/show";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function WildernessStatus() {
  const showWildernessStatusValue = useAtomValue(showWildernessStatus);

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
