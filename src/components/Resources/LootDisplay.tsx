import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Looting } from "@neverquest/components/Resources/Looting";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { ReactComponent as IconOpenChest } from "@neverquest/icons/open-chest.svg";
import { progress } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function LootDisplay() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass({ type: "flipInX" })}>
          <Card.Body>
            {hasLootedValue ? (
              <IconDisplay
                contents={<span className="fst-italic">Nothing remains.</span>}
                Icon={IconOpenChest}
                isSpaced
                tooltip="Loot"
              />
            ) : (
              <ResourceDisplay isLoot />
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
