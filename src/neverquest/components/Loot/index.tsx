import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import LootDisplay from "neverquest/components/Loot/LootDisplay";
import lootIcon from "neverquest/icons/locked-chest.svg";
import lootedIcon from "neverquest/icons/open-chest.svg";
import { progress } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";

export default function Loot() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);

  if (progressValue === 0) {
    return null;
  }

  return (
    <>
      <hr />

      <Card>
        <Card.Body>
          <Stack direction="horizontal" gap={5}>
            <ImageIcon icon={hasLootedValue ? lootedIcon : lootIcon} tooltip="Loot" />

            {hasLootedValue && <span style={{ fontStyle: "italic" }}>Nothing remains.</span>}

            {!hasLootedValue && <LootDisplay isLoot />}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}
