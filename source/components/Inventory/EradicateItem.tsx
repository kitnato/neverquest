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
import { useNeutralize } from "@neverquest/hooks/actions/useNeutralize";
import IconEradicate from "@neverquest/icons/eradicate.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";
import type { MerchantInventoryItem } from "@neverquest/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function EradicateItem({ item }: { item: MerchantInventoryItem }) {
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const { ID, name } = item;

  const neutralize = useNeutralize();

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

        <ModalBody>{`"${capitalizeAll(name)}" will be irretrievably destroyed.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setMerchantInventory((currentInventory) =>
                currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
              );

              neutralize({ isEradicated: true, item });

              onHide();
            }}
            variant="outline-dark"
          >
            <span>Eradicate</span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
