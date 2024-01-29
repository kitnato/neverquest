import { Badge, Button, OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributeIncreaseDetails } from "@neverquest/components/Attributes/AttributeIncreaseDetails";
import { AttributeRank } from "@neverquest/components/Attributes/AttributeRank";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_SKILL_REQUIRED,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { useIncreaseAttribute } from "@neverquest/hooks/actions/useIncreaseAttribute";
import IconWait from "@neverquest/icons/hourglass.svg?react";
import IconIncrease from "@neverquest/icons/increase.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { areAttributesAffordable, isAttributeAtMaximum } from "@neverquest/state/attributes";
import { acquiredSkills } from "@neverquest/state/skills";
import type { Attribute } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function AttributeDisplay({ attribute }: { attribute: Attribute }) {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const areAttributesAffordableValue = useRecoilValue(areAttributesAffordable);
  const isAttributeAtMaximumValue = useRecoilValue(isAttributeAtMaximum(attribute));

  const increaseAttribute = useIncreaseAttribute();

  const { description, Icon, requiredSkill } = ATTRIBUTES[attribute];
  const name = capitalizeAll(attribute);

  if (requiredSkill === undefined || acquiredSkillsValue[requiredSkill]) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay description={<span>{description}</span>} Icon={Icon} tooltip="Attribute">
          <span>{name}</span>
        </IconDisplay>

        <Stack className="ms-2" direction="horizontal" style={{ gap: "7.5rem" }}>
          <AttributeRank attribute={attribute} />

          {isAttributeAtMaximumValue ? (
            <Button className="border-0" disabled variant="outline-dark">
              <Badge bg="dark">{LABEL_MAXIMUM}</Badge>
            </Button>
          ) : (
            <OverlayTrigger
              overlay={
                <Popover>
                  <PopoverBody>
                    <Stack gap={1}>
                      <AttributeIncreaseDetails attribute={attribute} />
                    </Stack>
                  </PopoverBody>
                </Popover>
              }
              placement="left"
            >
              <div>
                <Button
                  disabled={!areAttributesAffordableValue}
                  onClick={() => {
                    increaseAttribute(attribute);
                  }}
                  variant="outline-dark"
                >
                  <IconImage Icon={areAttributesAffordableValue ? IconIncrease : IconWait} />
                </Button>
              </div>
            </OverlayTrigger>
          )}
        </Stack>
      </div>
    );
  }

  return (
    <IconDisplay
      description={<span>{LABEL_SKILL_REQUIRED}</span>}
      Icon={IconUnknown}
      tooltip="Attribute"
    >
      <span>{LABEL_UNKNOWN}</span>
    </IconDisplay>
  );
}
