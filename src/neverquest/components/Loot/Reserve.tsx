import { RecoilState, useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay } from "neverquest/env";

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
    <Stack className="animate__animated animate__flipInX" direction="horizontal" gap={3}>
      <Component value={lootValue} />

      <FloatingText atom={deltaAtom} />
    </Stack>
  );
}
