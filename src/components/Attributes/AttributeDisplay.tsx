import { Badge, Button, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributeIncreaseDetails } from "@neverquest/components/Attributes/AttributeIncreaseDetails";
import { AttributeRank } from "@neverquest/components/Attributes/AttributeRank";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM, LABEL_UNKNOWN } from "@neverquest/data/general";
import { useIncreaseAttribute } from "@neverquest/hooks/actions/useIncreaseAttribute";
import { ReactComponent as IconWait } from "@neverquest/icons/hourglass.svg";
import { ReactComponent as IconIncrease } from "@neverquest/icons/increase.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import {
  areAttributesAffordable,
  isAttributeAtMaximum,
  isAttributeUnlocked,
} from "@neverquest/state/attributes";
import { isStageCompleted, isStageStarted, isWilderness } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import type { Attribute } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function AttributeDisplay({ attribute }: { attribute: Attribute }) {
  const { isUnlocked } = useRecoilValue(isAttributeUnlocked(attribute));
  const areAttributesAffordableValue = useRecoilValue(areAttributesAffordable);
  const isAttributeAtMaximumValue = useRecoilValue(isAttributeAtMaximum(attribute));
  const isShowingStamina = useRecoilValue(isShowing("stamina"));
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isWildernessValue = useRecoilValue(isWilderness);

  const increaseAttribute = useIncreaseAttribute();

  const { description, Icon } = ATTRIBUTES[attribute];
  const isUnsafe = isStageStartedValue && !isStageCompletedValue && isWildernessValue;
  const canIncrease = areAttributesAffordableValue && !isUnsafe;
  const name = capitalizeAll(attribute);

  if (attribute === "endurance" && !isShowingStamina) {
    return null;
  }

  if (isUnlocked) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents={name} description={description} Icon={Icon} tooltip="Attribute" />

        <Stack direction="horizontal" gap={5}>
          <AttributeRank attribute={attribute} />

          {isAttributeAtMaximumValue ? (
            <Badge bg="secondary">{LABEL_MAXIMUM}</Badge>
          ) : (
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Body>
                    <Stack gap={1}>
                      <AttributeIncreaseDetails attribute={attribute} />

                      {!areAttributesAffordableValue && "No attribute points."}

                      {isUnsafe && "Cannot concentrate."}
                    </Stack>
                  </Popover.Body>
                </Popover>
              }
            >
              <span>
                <Button
                  disabled={!canIncrease}
                  onClick={() => increaseAttribute(attribute)}
                  variant="outline-dark"
                >
                  <IconImage Icon={canIncrease ? IconIncrease : IconWait} />
                </Button>
              </span>
            </OverlayTrigger>
          )}
        </Stack>
      </div>
    );
  }

  return (
    <IconDisplay
      contents={LABEL_UNKNOWN}
      description="Unlocked by acquiring a skill."
      Icon={IconUnknown}
      tooltip="Attribute"
    />
  );
}
