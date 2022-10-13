import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { AnimationType, DeltaDisplay } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({
  atom,
  Component,
  deltaAtom,
  showAtom,
}: {
  Component: React.ElementType;
  atom: RecoilState<number>;
  deltaAtom: RecoilState<DeltaDisplay>;
  showAtom: RecoilState<boolean>;
}) {
  const lootValue = useRecoilValue(atom);
  const showValue = useRecoilValue(showAtom);

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
