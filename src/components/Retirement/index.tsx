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

import { IconImage } from "@neverquest/components/IconImage";
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited";
import { ProgressDiscount } from "@neverquest/components/Retirement/ProgressDiscount";
import { ResetDetails } from "@neverquest/components/Retirement/ResetDetails";
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { useRetire } from "@neverquest/hooks/actions/useRetire";
import IconRetire from "@neverquest/icons/retire.svg?react";

export function Retirement({
  state: [isShowing, setIsShowing],
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const generateMonster = useGenerateMonster();
  const retire = useRetire();

  const onHide = () => setIsShowing(false);

  return (
    <Modal onHide={onHide} show={isShowing} size="lg">
      <ModalHeader closeButton>
        <ModalTitle>
          <Stack direction="horizontal" gap={3}>
            <IconImage Icon={IconRetire} />
            Retirement
          </Stack>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={5}>
          Retiring starts a new quest with quicker progress per stage alongside a powerful trait.
          <ResetDetails />
          <ProgressDiscount />
          <ItemsInherited />
          <TraitSelection />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            onHide();
            retire();
            generateMonster();
          }}
          variant="outline-dark"
        >
          Retire
        </Button>
      </ModalFooter>
    </Modal>
  );
}
