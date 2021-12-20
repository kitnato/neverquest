import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";

import Attributes from "components/Attributes";
import DismissableScreen from "components/DismissableScreen";
import { isAttacking } from "state/character";
import { show } from "state/global";

export default function AttributesButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showValue = useRecoilValue(show);
  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!showValue.attributes) {
    return null;
  }

  return (
    <>
      <div className="d-grid">
        <Button
          disabled={isScreenShowing || isAttackingValue}
          onClick={() => setScreenShowing(!isScreenShowing)}
          variant="outline-dark"
        >
          Attributes
        </Button>
      </div>

      <DismissableScreen
        content={<Attributes />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Attributes"
      />
    </>
  );
}
