import { Stack } from "react-bootstrap";
import { type RecoilState, useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import type { Delta } from "@neverquest/types/enums";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resource({
  atom,
  Component,
  deltaType,
  showAtom,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
  deltaType: Delta;
  showAtom: RecoilState<boolean>;
}) {
  const lootValue = useRecoilValue(atom);
  const showValue = useRecoilValue(showAtom);

  useDeltaText({
    atomDelta: deltas(deltaType),
    atomValue: atom,
  });

  if (!showValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ type: "flipInX" })} direction="horizontal" gap={3}>
      <Component value={lootValue} />

      <FloatingText type={deltaType} />
    </Stack>
  );
}
