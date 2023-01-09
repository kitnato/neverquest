import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { AnimationType, DeltaDisplay } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({
  atom,
  atomDelta,
  Component,
  tooltip,
}: {
  Component: React.ElementType;
  atom: RecoilState<number>;
  atomDelta: RecoilState<DeltaDisplay>;
  tooltip: string;
}) {
  const resourceValue = useRecoilValue(atom);

  useDeltaText({
    atomDelta,
    // stop: () => false,
    atomValue: atom,
  });

  if (resourceValue === 0) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <Component tooltip={tooltip} value={resourceValue} />

      <FloatingText atom={atomDelta} />
    </Stack>
  );
}
