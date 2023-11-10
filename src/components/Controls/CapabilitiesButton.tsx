import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconBadge } from "@neverquest/components/IconBadge";
import { IconImage } from "@neverquest/components/IconImage";
import { IconTabs } from "@neverquest/components/IconTabs";
import { Skills } from "@neverquest/components/Skills";
import { Traits } from "@neverquest/components/Traits";
import IconAttributes from "@neverquest/icons/attributes.svg?react";
import IconCapabilities from "@neverquest/icons/capabilities.svg?react";
import IconSkills from "@neverquest/icons/skills.svg?react";
import IconTraits from "@neverquest/icons/traits.svg?react";
import IconUpgrade from "@neverquest/icons/upgrade.svg?react";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import type { TabsData } from "@neverquest/types/props";
import { formatEnumeration } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

const BASE_TAB: TabsData = [
  {
    Component: Attributes,
    Icon: IconAttributes,
    label: "attributes",
  },
];
const BASE_TOOLTIP = ["Attributes"];

export function CapabilitiesButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isShowingAttributes = useRecoilValue(isShowing("attributes"));
  const isShowingSkills = useRecoilValue(isShowing("skills"));
  const isShowingTraits = useRecoilValue(isShowing("traits"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const isShowingSkillsOrTraits = isShowingSkills || isShowingTraits;

  let tabs: TabsData = [...BASE_TAB];
  let tooltip = [...BASE_TOOLTIP];

  if (isShowingSkills) {
    tabs = [
      ...tabs,
      {
        Component: Skills,
        Icon: IconSkills,
        label: "skills",
      },
    ];
    tooltip = [...tooltip, "skills"];
  }

  if (isShowingTraits) {
    tabs = [
      ...tabs,
      {
        Component: Traits,
        Icon: IconTraits,
        label: "traits",
      },
    ];
    tooltip = [...tooltip, "traits"];
  }

  if (!isShowingAttributes && !isShowingSkills && !isShowingTraits) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>{formatEnumeration(tooltip)}</Tooltip>}>
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

            {areAttributesIncreasableValue && (
              <IconBadge alignToButton>
                <IconImage Icon={IconUpgrade} size="small" />
              </IconBadge>
            )}
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title={`${isShowingSkillsOrTraits ? "Capabilities" : "Attributes"}`}
      >
        {isShowingSkillsOrTraits ? <IconTabs tabs={tabs} /> : <Attributes />}
      </DismissableScreen>
    </>
  );
}
