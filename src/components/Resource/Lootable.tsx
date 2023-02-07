import { Stack } from "react-bootstrap";
import { RecoilState, useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Lootable({
  atom,
  Component,
  deltaType,
  tooltip,
}: {
  Component: React.ElementType;
  atom: RecoilState<number>;
  deltaType: DeltaType;
  tooltip: string;
}) {
  const resourceValue = useRecoilValue(atom);

  useDeltaText({
    atomDelta: deltas(deltaType),
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

      <FloatingText type={deltaType} />
    </Stack>
  );
}
