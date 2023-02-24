import { Badge, Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_AT_MAXIMUM, LABEL_UNKNOWN } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useIncreaseAttribute } from "@neverquest/hooks/actions/useIncreaseAttribute";
import { ReactComponent as IconWait } from "@neverquest/icons/hourglass.svg";
import { ReactComponent as IconIncrease } from "@neverquest/icons/upgrade.svg";
import {
  areAttributesIncreasable,
  attributeCost,
  attributes,
  isAttributeAtMaximum,
} from "@neverquest/state/attributes";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";
import { AttributeType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export function Attribute({ type }: { type: AttributeType }) {
  const { isUnlocked, points } = useRecoilValue(attributes(type));
  const attributeCostValue = useRecoilValue(attributeCost);
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttributeAtMaximumValue = useRecoilValue(isAttributeAtMaximum(type));
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  const increaseAttribute = useIncreaseAttribute();

  const { description, Icon, name } = ATTRIBUTES[type];
  const canIncrease =
    areAttributesIncreasableValue && (!isLevelStartedValue || isLevelCompletedValue);

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
                overlay={<Tooltip>{`Cost: ${attributeCostValue} essence`}</Tooltip>}
                placement="top"
              >
                <span className="d-inline-block">
                  <Button
                    disabled={!canIncrease}
                    onClick={({ currentTarget }) => {
                      currentTarget.blur();

                      increaseAttribute(type);
                    }}
                    variant={UIVariant.Outline}
                  >
                    <IconImage Icon={canIncrease ? IconIncrease : IconWait} />
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </Stack>
        </>
      ) : (
        <span className="text-center w-100">{LABEL_UNKNOWN}</span>
      )}
    </div>
  );
}
