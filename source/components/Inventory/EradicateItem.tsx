import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconEradicate from "@neverquest/icons/eradicate.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function EradicateItem({ ID, name }: { ID: string; name: string }) {
  const setMerchantInventoryValue = useSetRecoilState(merchantInventory);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Eradicate</span>
          </Tooltip>
        }
      >
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-dark"
        >
          <IconImage className="small" Icon={IconEradicate} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconEradicate}>
              <span>Eradicate item?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{`"${capitalizeAll(
          name,
        )}" will no longer be available for purchase.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setMerchantInventoryValue((currentMerchantInventory) =>
                currentMerchantInventory.map((merchantItem) => {
                  if (merchantItem.ID === ID) {
                    return { ...merchantItem, isEradicated: true };
                  }

                  return merchantItem;
                }),
              );

              onHide();
            }}
            variant="outline-dark"
          >
            Eradicate
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
