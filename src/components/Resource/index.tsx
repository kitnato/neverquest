import Stack from "react-bootstrap/Stack";
import { RecoilState, useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({
  atom,
  Component,
  deltaType,
  showAtom,
}: {
  Component: React.ElementType;
  atom: RecoilState<number>;
  deltaType: DeltaType;
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
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <Component value={lootValue} />

      <FloatingText type={deltaType} />
    </Stack>
  );
}
