import { type FunctionComponent, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { Infusion } from "@neverquest/components/Items/Usable/Infusion";
import { InfusionLevel } from "@neverquest/components/Items/Usable/Infusion/InfusionLevel";
import { InfusionProgress } from "@neverquest/components/Items/Usable/Infusion/InfusionProgress";
import { EssenceBonus } from "@neverquest/components/Statistics/EssenceBonus";
import { PowerBonusBoost } from "@neverquest/components/Statistics/PowerBonusBoost";
import { INFUSABLES } from "@neverquest/data/inventory";
import type { Infusable } from "@neverquest/types/unions";

const EFFECT_COMPONENT: Record<Infusable, FunctionComponent> = {
  "monkey paw": EssenceBonus,
  "tome of power": PowerBonusBoost,
};

export function InfusionInspect({ infusable }: { infusable: Infusable }) {
  const [isShowingInfusion, setIsShowingInfusion] = useState(false);

  const EffectComponent = EFFECT_COMPONENT[infusable];
  const { Icon } = INFUSABLES[infusable];

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
            <EffectComponent />

            <Stack direction="horizontal" gap={3}>
              <InfusionLevel infusable={infusable} />

              <InfusionProgress infusable={infusable} />

              <Infusion infusable={infusable} />
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
