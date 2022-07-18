import { Atom, PrimitiveAtom, useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { DeltaDisplay, AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Lootable({
  atom,
  Component,
  deltaAtom,
  tooltip,
}: {
  atom: Atom<number>;
  Component: React.ElementType;
  deltaAtom: PrimitiveAtom<DeltaDisplay>;
  tooltip: string;
}) {
  const resourceValue = useAtomValue(atom);

  useDeltaText({
    countInitial: true,
    deltaAtom,
    valueAtom: atom,
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

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
