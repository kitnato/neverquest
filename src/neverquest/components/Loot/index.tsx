import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import LootDisplay from "neverquest/components/Loot/LootDisplay";
import Looting from "neverquest/components/Loot/Looting";
import lootIcon from "neverquest/icons/locked-chest.svg";
import lootedIcon from "neverquest/icons/open-chest.svg";
import { progress } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";
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
            <Stack direction="horizontal" gap={5}>
              <ImageIcon icon={hasLootedValue ? lootedIcon : lootIcon} tooltip="Loot" />

              {hasLootedValue ? (
                <span className="fst-italic">Nothing remains.</span>
              ) : (
                <LootDisplay isLoot />
              )}
            </Stack>
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
