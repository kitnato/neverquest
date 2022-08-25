import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { DeltaDisplay, AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({
  atom,
  Component,
  deltaAtom,
  tooltip,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
  deltaAtom: RecoilState<DeltaDisplay>;
  tooltip: string;
}) {
  const resourceValue = useRecoilValue(atom);

  useDeltaText({
    deltaAtom,
    stop: () => false,
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
