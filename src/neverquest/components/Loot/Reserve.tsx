import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay, UIAnimationType } from "neverquest/env";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Reserve({
  atom,
  Component,
  deltaAtom,
  showAtom,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
  deltaAtom: RecoilState<DeltaDisplay>;
  showAtom: RecoilState<boolean>;
}) {
  const lootValue = useRecoilValue(atom);
  const showValue = useRecoilValue(showAtom);

  if (!showValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <Component value={lootValue} />

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
