import { type FunctionComponent, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { Infusion } from "@neverquest/components/Inventory/Usable/Infusion";
import { HatchingProgress } from "@neverquest/components/Inventory/Usable/Infusion/HatchingProgress";
import { InfusionLevel } from "@neverquest/components/Inventory/Usable/Infusion/InfusionLevel";
import { InfusionProgress } from "@neverquest/components/Inventory/Usable/Infusion/InfusionProgress";
import { EssenceBonus } from "@neverquest/components/Statistics/EssenceBonus";
import { PowerBonusBoost } from "@neverquest/components/Statistics/PowerBonusBoost";
import { INFUSABLES } from "@neverquest/data/inventory";
import type { Infusable } from "@neverquest/types/unions";

const EFFECT_COMPONENT: Record<Infusable, FunctionComponent> = {
  "monkey paw": EssenceBonus,
  "mysterious egg": HatchingProgress,
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
        <ModalHeader closeButton>
          <ModalTitle>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={Icon} />
              Essence infusion
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Stack gap={3}>
            <EffectComponent />

            <Stack direction="horizontal" gap={3}>
              <InfusionLevel infusable={infusable} />

              <InfusionProgress infusable={infusable} />

              <Infusion infusable={infusable} />
            </Stack>
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
}
