import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { RESOURCES } from "@neverquest/data/resources";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import type { Resource } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Loot({ type }: { type: Resource }) {
  const { atomLoot, deltaLoot } = RESOURCES[type];

  const resourceValue = useRecoilValue(atomLoot);

  useDeltaText({
    atomDelta: deltas(deltaLoot),
    atomValue: atomLoot,
  });

  if (resourceValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ type: "flipInX" })} direction="horizontal">
      <ResourceDisplay tooltip={`Looted ${type}`} type={type} value={resourceValue} />

      <FloatingText deltaType={deltaLoot} />
    </Stack>
  );
}
