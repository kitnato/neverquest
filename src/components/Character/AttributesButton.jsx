import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";

import AttributesModal from "components/Character/AttributesModal";
import { isAttacking } from "state/character";
import { show } from "state/global";

export default function AttributesButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showValue = useRecoilValue(show);
  const [isModalOpen, setModalOpen] = useState(false);

  if (!showValue.attributes) {
    return null;
  }

  return (
    <>
      <Button
        block
        disabled={isModalOpen || isAttackingValue}
        onClick={() => setModalOpen(!isModalOpen)}
        variant="outline-dark"
      >
        Attributes
      </Button>

      <AttributesModal
        isShowing={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
