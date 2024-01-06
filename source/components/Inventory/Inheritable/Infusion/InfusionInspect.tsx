import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Infusion } from "@neverquest/components/Inventory/Inheritable/Infusion";
import { InfusionEffect } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionEffect";
import { InfusionLevel } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevel";
import { InfusionProgress } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionProgress";
import { INFUSABLES } from "@neverquest/data/items";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Infusable } from "@neverquest/types/unions";

export function InfusionInspect({ infusable }: { infusable: Infusable }) {
  const isSkillAcquiredIncubation = useRecoilValue(isSkillAcquired("incubation"));

  const [isShowingInfusion, setIsShowingInfusion] = useState(false);

  const { Icon } = INFUSABLES[infusable];

  if (isSkillAcquiredIncubation || infusable !== "mysterious egg") {
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
              <IconDisplay Icon={Icon}>
                <span>Essence infusion</span>
              </IconDisplay>
            </ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Stack gap={3}>
              <InfusionEffect infusable={infusable} />

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
}
