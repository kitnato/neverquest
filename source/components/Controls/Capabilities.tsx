import { useState } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
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
import { hasFlatlined, isAttacking } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { acquiredSkills } from "@neverquest/state/skills";
import { acquiredTraits } from "@neverquest/state/traits";
import type { TabsData } from "@neverquest/types/components";
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

export function Capabilities() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isShowingCapabilities = useRecoilValue(isShowing("capabilities"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  let tabs: TabsData = [...BASE_TAB];
  let tooltip = [...BASE_TOOLTIP];

  const isShowingSkills = Object.values(acquiredSkillsValue).some(Boolean);
  const isShowingTraits = Object.values(acquiredTraitsValue).some(Boolean);
  const isShowingSkillsOrTraits = isShowingSkills || isShowingTraits;

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

  if (isShowingCapabilities) {
    return (
      <>
        <OverlayTrigger overlay={<Tooltip>{formatEnumeration(tooltip)}</Tooltip>}>
          <div className={getAnimationClass({ animation: "bounceIn" })}>
            <Button
              className={`position-relative${
                areAttributesIncreasableValue && !isStageStartedValue
                  ? ` ${getAnimationClass({
                      animation: "pulse",
                      isInfinite: true,
                    })}`
                  : ""
              }`}
              disabled={isAttackingValue || hasFlatlinedValue}
              onClick={() => {
                setScreenShowing(true);
              }}
              variant="outline-dark"
            >
              <IconImage Icon={IconCapabilities} />

              {areAttributesIncreasableValue && (
                <Badge
                  bg="secondary"
                  className="position-absolute top-50 start-100 translate-middle"
                >
                  <IconImage className="small" Icon={IconUpgrade} />
                </Badge>
              )}
            </Button>
          </div>
        </OverlayTrigger>

        <DismissableScreen
          isShowing={isScreenShowing}
          onClose={() => {
            setScreenShowing(false);
          }}
          title={`${isShowingSkillsOrTraits ? "Capabilities" : "Attributes"}`}
        >
          {isShowingSkillsOrTraits ? <IconTabs tabs={tabs} /> : <Attributes />}
        </DismissableScreen>
      </>
    );
  }
}