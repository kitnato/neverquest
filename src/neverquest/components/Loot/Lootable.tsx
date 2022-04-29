import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay, AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Lootable({
  atom,
  Component,
  deltaAtom,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
  deltaAtom: RecoilState<DeltaDisplay>;
}) {
  const resourceValue = useRecoilValue(atom);

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
