import type { Dispatch, SetStateAction } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Stack,
} from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited";
import { Perks } from "@neverquest/components/Retirement/Perks";
import { ResetDetails } from "@neverquest/components/Retirement/ResetDetails";
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection";
import { useRetire } from "@neverquest/hooks/actions/useRetire";
import IconRetire from "@neverquest/icons/retire.svg?react";

export function Retirement({
  state: [isShowing, setIsShowing],
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const retire = useRetire();

  const onHide = () => {
    setIsShowing(false);
  };

  return (
    <Modal onHide={onHide} show={isShowing} size="lg">
      <ModalHeader closeButton>
        <ModalTitle>
          <IconDisplay Icon={IconRetire}>
            <span>Retirement</span>
          </IconDisplay>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={5}>
          <span>
            Retiring restarts from the beginning with reduced monster density and increased essence
            loot. A powerful trait can also be chosen, bestowing a permanent boon. All acquired
            relics are inherited.
          </span>

          <ResetDetails />

          <Perks />

          <ItemsInherited />

          <TraitSelection />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            onHide();
            retire();
          }}
          variant="outline-dark"
        >
          Retire
        </Button>
      </ModalFooter>
    </Modal>
  );
}
