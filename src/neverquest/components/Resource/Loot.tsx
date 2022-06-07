import { useAtomValue } from "jotai";
import { Card, Stack } from "react-bootstrap";

import ImageIcon from "neverquest/components/ImageIcon";
import ResourceDisplay from "neverquest/components/Resource/ResourceDisplay";
import Looting from "neverquest/components/Resource/Looting";
import icon from "neverquest/icons/open-chest.svg";
import { progress } from "neverquest/state/encounter";
import { hasLooted } from "neverquest/state/resources";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Loot() {
  const hasLootedValue = useAtomValue(hasLooted);
  const progressValue = useAtomValue(progress);

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass(AnimationType.FlipInX)}>
          <Card.Body>
            {hasLootedValue ? (
              <Stack direction="horizontal" gap={5}>
                <ImageIcon icon={icon} tooltip="Loot" />

                <span className="fst-italic">Nothing remains.</span>
              </Stack>
            ) : (
              <ResourceDisplay isLoot />
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
