import { Atom, PrimitiveAtom, useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay, AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Lootable({
  atom,
  Component,
  deltaAtom,
}: {
  atom: Atom<number>;
  Component: React.ElementType;
  deltaAtom: PrimitiveAtom<DeltaDisplay>;
}) {
  const resourceValue = useAtomValue(atom);

  if (resourceValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <Component value={resourceValue} />

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
