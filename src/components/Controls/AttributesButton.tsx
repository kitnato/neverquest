import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconAttributes } from "@neverquest/icons/skills.svg";
import { ReactComponent as IconUpgrade } from "@neverquest/icons/upgrade.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isLevelStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttributesButton({ isDisabled }: { isDisabled: boolean }) {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isShowingAttributesButton = useRecoilValue(isShowing(ShowingType.AttributesButton));

  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!isShowingAttributesButton) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Attributes</Tooltip>} placement="top">
        <span
          className={`d-inline-block ${getAnimationClass({
            type: AnimationType.BounceIn,
          })}`}
        >
          <Button
            className={`position-relative${
              areAttributesIncreasableValue && !isLevelStartedValue
                ? ` ${getAnimationClass({
                    isInfinite: true,
                    type: AnimationType.Pulse,
                  })}`
                : ""
            }`}
            disabled={isAttackingValue || isDisabled}
            onClick={() => setScreenShowing(true)}
            variant={UIVariant.Outline}
          >
            <IconImage Icon={IconAttributes} />

            <ButtonBadge Icon={IconUpgrade} isShowing={areAttributesIncreasableValue} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        contents={<Attributes />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Attributes"
      />
    </>
  );
}