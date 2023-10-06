import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { IconTabs } from "@neverquest/components/IconTabs";
import { Skills } from "@neverquest/components/Skills";
import { ReactComponent as IconAttributes } from "@neverquest/icons/attributes.svg";
import { ReactComponent as IconCapabilities } from "@neverquest/icons/capabilities.svg";
import { ReactComponent as IconSkills } from "@neverquest/icons/skills.svg";
import { ReactComponent as IconUpgrade } from "@neverquest/icons/upgrade.svg";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CapabilitiesButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isShowingCapabilities = useRecoilValue(isShowing("capabilities"));
  const isShowingSkills = useRecoilValue(isShowing("skills"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!isShowingCapabilities) {
    return null;
  }

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>{`Attributes${isShowingSkills ? " & skills" : ""}`}</Tooltip>}
      >
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={`position-relative${
              areAttributesIncreasableValue && !isStageStartedValue
                ? ` ${getAnimationClass({
                    isInfinite: true,
                    name: "pulse",
                  })}`
                : ""
            }`}
            disabled={isAttackingValue || isGameOverValue}
            onClick={() => setScreenShowing(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconCapabilities} />

            <ButtonBadge Icon={IconUpgrade} isShowing={areAttributesIncreasableValue} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title={`${isShowingSkills ? "Capabilities" : "Attributes"}`}
      >
        {isShowingSkills ? (
          <IconTabs
            defaultTab="attributes"
            tabs={[
              {
                Component: Attributes,
                Icon: IconAttributes,
                label: "attributes",
              },
              {
                Component: Skills,
                Icon: IconSkills,
                label: "skills",
              },
            ]}
          />
        ) : (
          <Attributes />
        )}
      </DismissableScreen>
    </>
  );
}
