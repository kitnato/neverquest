import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { RESOURCES } from "@neverquest/data/resources";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import type { Resource } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resource({ type }: { type: Resource }) {
  const { atom, delta, showing } = RESOURCES[type];

  const lootValue = useRecoilValue(atom);
  const showValue = useRecoilValue(isShowing(showing));

  useDeltaText({
    delta: deltas(delta),
    value: atom,
  });

  if (!showValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ type: "flipInX" })} direction="horizontal">
      <ResourceDisplay type={type} value={lootValue} />

      <FloatingText deltaType={delta} />
    </Stack>
  );
}
