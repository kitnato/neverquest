import { MouseEvent, useState } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Attributes from "@neverquest/components/Attributes";
import DismissableScreen from "@neverquest/components/DismissableScreen";
import IconImage from "@neverquest/components/IconImage";
import { ReactComponent as Icon } from "@neverquest/icons/skills.svg";
import { attributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { isMonsterEngaged } from "@neverquest/state/monster";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const showAttributesButtonValue = useRecoilValue(isShowing(ShowingType.AttributesButton));
  const [isScreenShowing, setScreenShowing] = useState(false);

  const isButtonDisabled = isAttackingValue || isDisabled || isMonsterEngagedValue;

  if (!showAttributesButtonValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Attributes</Tooltip>} placement="top">
        <span className={`${getAnimationClass({ type: AnimationType.FlipInX })} d-inline-block`}>
          <Button
            className={`position-relative${
              attributesIncreasableValue && !isButtonDisabled
                ? ` ${getAnimationClass({ isInfinite: true, type: AnimationType.Pulse })}`
                : ""
            }`}
            disabled={isButtonDisabled}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              setScreenShowing(true);
            }}
            variant={UIVariant.Outline}
          >
            <IconImage Icon={Icon} />

            {attributesIncreasableValue && (
              <Badge bg="secondary" className="position-absolute" style={{ top: 12 }}>
                &#43;
              </Badge>
            )}
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
