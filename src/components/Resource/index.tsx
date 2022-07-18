import { Atom, PrimitiveAtom, useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "@neverquest/components/FloatingText";
import { DeltaDisplay, AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import useDeltaText from "@neverquest/hooks/useDeltaText";

export default function Resource({
  atom,
  Component,
  deltaAtom,
  showAtom,
}: {
  atom: Atom<number>;
  Component: React.ElementType;
  deltaAtom: PrimitiveAtom<DeltaDisplay>;
  showAtom: Atom<boolean>;
}) {
  const lootValue = useAtomValue(atom);
  const showValue = useAtomValue(showAtom);

  useDeltaText({
    deltaAtom,
    stop: () => false,
    valueAtom: atom,
  });

  if (!showValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <Component value={lootValue} />

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
