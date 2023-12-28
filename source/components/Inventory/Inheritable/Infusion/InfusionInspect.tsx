import { type FunctionComponent, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { HatchingProgress } from "@neverquest/components/Inventory/Inheritable/Infusion/HatchingProgress";
import { Infuse } from "@neverquest/components/Inventory/Inheritable/Infusion/Infuse";
import { InfusionLevel } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevel";
import { InfusionProgress } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionProgress";
import { EssenceBonus } from "@neverquest/components/Statistics/EssenceBonus";
import { PowerBonusBoost } from "@neverquest/components/Statistics/PowerBonusBoost";
import { INFUSABLES } from "@neverquest/data/items";
import { canInfuseMysteriousEgg } from "@neverquest/state/inventory";
import type { Infusable } from "@neverquest/types/unions";

const EFFECT_COMPONENT: Record<Infusable, FunctionComponent> = {
  "monkey paw": EssenceBonus,
  "mysterious egg": HatchingProgress,
  "tome of power": PowerBonusBoost,
};

export function InfusionInspect({ infusable }: { infusable: Infusable }) {
  const canInfuseMysteriousEggValue = useRecoilValue(canInfuseMysteriousEgg);

  const [isShowingInfusion, setIsShowingInfusion] = useState(false);

  const EffectComponent = EFFECT_COMPONENT[infusable];
  const { Icon } = INFUSABLES[infusable];

  if (canInfuseMysteriousEggValue || infusable !== "mysterious egg") {
    return (
      <>
        <Button
          onClick={() => {
            setIsShowingInfusion(true);
          }}
          variant="outline-dark"
        >
          Inspect
        </Button>

        <Modal
          centered
          onHide={() => {
            setIsShowingInfusion(false);
          }}
          show={isShowingInfusion}
        >
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

                <Infuse infusable={infusable} />
              </Stack>
            </Stack>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
