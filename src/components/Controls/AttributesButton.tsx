import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconAttributes } from "@neverquest/icons/attributes.svg";
import { ReactComponent as IconUpgrade } from "@neverquest/icons/upgrade.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttributesButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isShowingAttributesButton = useRecoilValue(isShowing("attributesButton"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!isShowingAttributesButton) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Attributes</Tooltip>}>
        <span className={getAnimationClass({ type: "bounceIn" })}>
          <Button
            className={`position-relative${
              areAttributesIncreasableValue && (isStageCompletedValue || !isStageStartedValue)
                ? ` ${getAnimationClass({
                    isInfinite: true,
                    type: "pulse",
                  })}`
                : ""
            }`}
            disabled={isAttackingValue || isGameOverValue}
            onClick={() => setScreenShowing(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconAttributes} />

            <ButtonBadge Icon={IconUpgrade} isShowing={areAttributesIncreasableValue} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Attributes"
      >
        <Attributes />
      </DismissableScreen>
    </>
  );
}
