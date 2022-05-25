import Stack from "react-bootstrap/Stack";
import { Atom, PrimitiveAtom, useAtomValue } from "jotai";

import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay, AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Reserve({
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

  if (!showValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <Component value={lootValue} />

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
