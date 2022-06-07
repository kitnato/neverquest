import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { Clock, Plus } from "react-bootstrap-icons";
import { PrimitiveAtom, useSetAtom, useAtom, useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
// TODO - every attribute needs its own icon
import placeholderIcon from "neverquest/icons/abstract-049.svg";
import { Attribute as AttributeType } from "neverquest/types/core";
import { attributeCost, attributesIncreasable } from "neverquest/state/attributes";
import { characterLevel } from "neverquest/state/character";
import { deltaCharacterLevel, deltaEssenceAbsorbed } from "neverquest/state/deltas";
import { resourcesBalance } from "neverquest/state/resources";
import { FloatingTextType, UIVariant } from "neverquest/types/ui";

export default function Attribute({ atom }: { atom: PrimitiveAtom<AttributeType> }) {
  const [attributeValue, setAttribute] = useAtom(atom);
  const attributeCostValue = useAtomValue(attributeCost);
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const setCharacterLevel = useSetAtom(characterLevel);
  const setDeltaCharacterLevel = useSetAtom(deltaCharacterLevel);
  const setDeltaEssenceAbsorbed = useSetAtom(deltaEssenceAbsorbed);
  const balanceResources = useSetAtom(resourcesBalance);

  const { canAssign, description, name, points } = attributeValue;

  if (!canAssign) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={placeholderIcon} tooltip={name} />

      <span style={{ width: 260 }}>{description}</span>

      <span style={{ width: 20 }}>{points}</span>

      <OverlayTrigger
        overlay={<Tooltip>{`Cost: ${attributeCostValue} essence`}</Tooltip>}
        placement="top"
      >
        <span className="d-inline-block">
          <Button
            disabled={!attributesIncreasableValue}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              setAttribute((current) => ({
                ...current,
                points: current.points + 1,
              }));

              balanceResources({ essenceDifference: -attributeCostValue });
              setDeltaEssenceAbsorbed({
                color: FloatingTextType.Positive,
                value: `+${attributeCostValue}`,
              });

              setCharacterLevel((current) => current + 1);
              setDeltaCharacterLevel({ color: FloatingTextType.Positive, value: "+1" });
            }}
            variant={UIVariant.Outline}
          >
            {attributesIncreasableValue ? <Plus /> : <Clock />}
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
