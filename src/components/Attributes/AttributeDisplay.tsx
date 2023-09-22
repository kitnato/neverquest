import { Badge, Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributeIncreaseDetails } from "@neverquest/components/Attributes/AttributeIncreaseDetails";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useIncreaseAttribute } from "@neverquest/hooks/actions/useIncreaseAttribute";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconWait } from "@neverquest/icons/hourglass.svg";
import { ReactComponent as IconIncrease } from "@neverquest/icons/increase.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import {
  areAttributesIncreasable,
  attributeCost,
  attributes,
  isAttributeAtMaximum,
} from "@neverquest/state/attributes";
import { isStageCompleted, isStageStarted, isWilderness } from "@neverquest/state/encounter";
import type { Attribute } from "@neverquest/types/unions";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_UNKNOWN,
} from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function AttributeDisplay({ type }: { type: Attribute }) {
  const { isUnlocked, points } = useRecoilValue(attributes(type));
  const attributeCostValue = useRecoilValue(attributeCost);
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttributeAtMaximumValue = useRecoilValue(isAttributeAtMaximum(type));
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isWildernessValue = useRecoilValue(isWilderness);

  const increaseAttribute = useIncreaseAttribute();

  const { description, Icon } = ATTRIBUTES[type];
  const isUnsafe = isStageStartedValue && !isStageCompletedValue && isWildernessValue;
  const canIncrease = areAttributesIncreasableValue && !isUnsafe;
  const name = capitalizeAll(type);

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {isUnlocked ? (
        <>
          <IconDisplay contents={name} description={description} Icon={Icon} tooltip="Attribute" />

          <Stack direction="horizontal" gap={3}>
            <span>{points}</span>

            {isAttributeAtMaximumValue ? (
              <Badge bg="secondary">{LABEL_MAXIMUM}</Badge>
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    <AttributeIncreaseDetails type={type} />

                    <div>
                      Cost:&nbsp;
                      <IconImage Icon={IconEssence} size="tiny" />
                      &nbsp;{attributeCostValue}
                    </div>

                    {isUnsafe && <div>Monsters are lurking!</div>}
                  </Tooltip>
                }
              >
                <span>
                  <Button
                    disabled={!canIncrease}
                    onClick={() => increaseAttribute(type)}
                    variant="outline-dark"
                  >
                    <IconImage Icon={canIncrease ? IconIncrease : IconWait} />
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </Stack>
        </>
      ) : (
        <IconDisplay
          contents={LABEL_UNKNOWN}
          description="Unlocked by acquiring a skill."
          Icon={IconUnknown}
          tooltip="Attribute"
        />
      )}
    </div>
  );
}
