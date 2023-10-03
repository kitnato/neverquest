import { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { Infusion } from "@neverquest/components/Items/Trinkets/Infusion";
import { InfusionLevel } from "@neverquest/components/Items/Trinkets/Infusion/InfusionLevel";
import { InfusionProgress } from "@neverquest/components/Items/Trinkets/Infusion/InfusionProgress";
import { EssenceBonus } from "@neverquest/components/Statistics/EssenceBonus";
import { TRINKETS } from "@neverquest/data/inventory";
import type { Trinket } from "@neverquest/types/unions";

export function InfusionInspect({ trinket }: { trinket: Trinket }) {
  const [isShowingInfusion, setIsShowingInfusion] = useState(false);

  const { Icon } = TRINKETS[trinket];

  return (
    <>
      <Button onClick={() => setIsShowingInfusion(true)} variant="outline-dark">
        Inspect
      </Button>

      <Modal centered onHide={() => setIsShowingInfusion(false)} show={isShowingInfusion}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={Icon} />
              Essence infusion
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack gap={3}>
            <EssenceBonus />

            <Stack direction="horizontal" gap={3}>
              <InfusionLevel trinket={trinket} />

              <InfusionProgress trinket={trinket} />

              <Infusion trinket={trinket} />
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
