import { MouseEvent } from "react";
import { Badge, Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import IconImage from "@neverquest/components/IconImage";
import { CLASS_FULL_WIDTH_JUSTIFIED, UNKNOWN } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/constants/attributes";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconWait } from "@neverquest/icons/hourglass.svg";
import { ReactComponent as IconIncrease } from "@neverquest/icons/upgrade.svg";
import {
  areAttributesIncreasable,
  attributeCost,
  attributes,
  isAttributeMaxed,
} from "@neverquest/state/attributes";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isLevelStarted } from "@neverquest/state/monster";
import { AttributeType, DeltaType } from "@neverquest/types/enums";
import { FloatingText, UIVariant } from "@neverquest/types/ui";

export default function ({ type }: { type: AttributeType }) {
  const [{ isUnlocked, points }, setAttribute] = useRecoilState(attributes(type));
  const attributeCostValue = useRecoilValue(attributeCost);
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttributeMaxedValue = useRecoilValue(isAttributeMaxed(type));
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const setDeltaCharacterLevel = useSetRecoilState(deltas(DeltaType.CharacterLevel));
  const setDeltaEssenceAbsorbed = useSetRecoilState(deltas(DeltaType.EssenceAbsorbed));

  const transactResources = useTransactResources();

  const { description, Icon, name } = ATTRIBUTES[type];

  const onIncrease = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    currentTarget.blur();

    setAttribute((current) => ({
      ...current,
      points: current.points + 1,
    }));

    transactResources({
      essenceDifference: -attributeCostValue,
    });
    setDeltaEssenceAbsorbed({
      color: FloatingText.Positive,
      value: `+${attributeCostValue}`,
    });

    setCharacterLevel((current) => current + 1);
    setDeltaCharacterLevel({
      color: FloatingText.Positive,
      value: "+1",
    });
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {isUnlocked ? (
        <>
          <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />

          <Stack direction="horizontal" gap={3}>
            <span>{points}</span>

            {isAttributeMaxedValue ? (
              <Badge bg="secondary">MAX</Badge>
            ) : (
              <OverlayTrigger
                overlay={<Tooltip>{`Cost: ${attributeCostValue} essence`}</Tooltip>}
                placement="top"
              >
                <span className="d-inline-block">
                  <Button
                    disabled={!areAttributesIncreasableValue || isLevelStartedValue}
                    onClick={onIncrease}
                    variant={UIVariant.Outline}
                  >
                    <IconImage
                      Icon={
                        areAttributesIncreasableValue && !isLevelStartedValue
                          ? IconIncrease
                          : IconWait
                      }
                    />
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </Stack>
        </>
      ) : (
        <span className="text-center w-100">{UNKNOWN}</span>
      )}
    </div>
  );
}
