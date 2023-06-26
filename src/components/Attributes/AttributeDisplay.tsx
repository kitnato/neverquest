import { Badge, Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

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
import { isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import type { Attribute } from "@neverquest/types/unions";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_AT_MAXIMUM,
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

  const increaseAttribute = useIncreaseAttribute();

  const { description, Icon } = ATTRIBUTES[type];
  const canIncrease =
    areAttributesIncreasableValue && (isStageCompletedValue || !isStageStartedValue);
  const name = capitalizeAll(type);

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {isUnlocked ? (
        <>
          <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />

          <Stack direction="horizontal" gap={3}>
            <span>{points}</span>

            {isAttributeAtMaximumValue ? (
              <Badge bg="secondary">{LABEL_AT_MAXIMUM}</Badge>
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    <div>
                      Cost:&nbsp;
                      <IconImage Icon={IconEssence} size="tiny" />
                      &nbsp;{attributeCostValue}
                    </div>

                    {isStageStartedValue && !isStageCompletedValue && (
                      <div>Monsters are lurking!</div>
                    )}
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
          description="There is power to be unlocked"
          Icon={IconUnknown}
          tooltip={LABEL_UNKNOWN}
        />
      )}
    </div>
  );
}
