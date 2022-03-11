import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import LootDisplay from "components/Loot/LootDisplay";
import lootIcon from "icons/locked-chest.svg";
import lootedIcon from "icons/open-chest.svg";
import { progress } from "state/global";
import { hasLooted } from "state/loot";

export default function Loot() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);

  return (
    progressValue > 0 && (
      <>
        <hr />

        <Card>
          <Card.Body>
            <Stack direction="horizontal" gap={5}>
              <ImageIcon
                icon={hasLootedValue ? lootedIcon : lootIcon}
                tooltip="Loot"
              />

              {hasLootedValue && (
                <span style={{ fontStyle: "italic" }}>Nothing remains.</span>
              )}

              {!hasLootedValue && <LootDisplay isLoot />}
            </Stack>
          </Card.Body>
        </Card>
      </>
    )
  );
}
