import { Stack } from "react-bootstrap";
import { type RecoilState, useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import type { DeltaType } from "@neverquest/types/enums";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Lootable({
  atom,
  Component,
  deltaType,
  tooltip,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
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
    <Stack className={getAnimationClass({ type: "flipInX" })} direction="horizontal" gap={3}>
      <Component tooltip={tooltip} value={resourceValue} />

      <FloatingText type={deltaType} />
    </Stack>
  );
}
