import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { Clock, Plus } from "react-bootstrap-icons";
import { useSetAtom, useAtom, useAtomValue } from "jotai";

import ImageIcon from "@neverquest/components/ImageIcon";
import { AttributeType } from "@neverquest/types/enums";
import { attributeCost, attributes, attributesIncreasable } from "@neverquest/state/attributes";
import { characterLevel } from "@neverquest/state/character";
import { deltaCharacterLevel, deltaEssenceAbsorbed } from "@neverquest/state/deltas";
import { resourcesBalance } from "@neverquest/state/resources";
import { FloatingTextType, UIVariant } from "@neverquest/types/ui";
import { ATTRIBUTES } from "@neverquest/utilities/constants-attributes";

export default function Attribute({ type }: { type: AttributeType }) {
  const [attributesValue, setAttributes] = useAtom(attributes);
  const attributeCostValue = useAtomValue(attributeCost);
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const setCharacterLevel = useSetAtom(characterLevel);
  const setDeltaCharacterLevel = useSetAtom(deltaCharacterLevel);
  const setDeltaEssenceAbsorbed = useSetAtom(deltaEssenceAbsorbed);
  const balanceResources = useSetAtom(resourcesBalance);

  const { description, icon, name } = ATTRIBUTES[type];
  const { canAssign, points } = attributesValue[type];

  if (!canAssign) {
    return null;
  }

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={icon} tooltip={name} />

        <span>{description}</span>
      </Stack>

      <Stack direction="horizontal" gap={3}>
        <span>{points}</span>

        <OverlayTrigger
          overlay={<Tooltip>{`Cost: ${attributeCostValue} essence`}</Tooltip>}
          placement="top"
        >
          <span className="d-inline-block">
            <Button
              disabled={!attributesIncreasableValue}
              onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                currentTarget.blur();

                setAttributes((current) => ({
                  ...current,
                  [type]: {
                    ...current[type],
                    points: current[type].points + 1,
                  },
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
    </div>
  );
}
