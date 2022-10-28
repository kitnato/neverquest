import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { Clock, Plus } from "react-bootstrap-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { UNKNOWN } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributeCost, attributes, attributesIncreasable } from "@neverquest/state/attributes";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { resourcesBalance } from "@neverquest/state/transactions";
import { AttributeType, DeltaType } from "@neverquest/types/enums";
import { FloatingText, UIVariant } from "@neverquest/types/ui";

export default function ({ type }: { type: AttributeType }) {
  const [{ isUnlocked, points }, setAttribute] = useRecoilState(attributes(type));
  const attributeCostValue = useRecoilValue(attributeCost);
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const setDeltaCharacterLevel = useSetRecoilState(deltas(DeltaType.CharacterLevel));
  const setDeltaEssenceAbsorbed = useSetRecoilState(deltas(DeltaType.EssenceAbsorbed));
  const balanceResources = useSetRecoilState(resourcesBalance);

  const { description, Icon, name } = ATTRIBUTES[type];

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
      {isUnlocked ? (
        <>
          <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />

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

                    setAttribute((current) => ({
                      ...current,
                      points: current.points + 1,
                    }));

                    balanceResources({
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
                  }}
                  variant={UIVariant.Outline}
                >
                  {attributesIncreasableValue ? <Plus height="1.5em" width="1.5em" /> : <Clock />}
                </Button>
              </span>
            </OverlayTrigger>
          </Stack>
        </>
      ) : (
        <span className="text-center w-100">{UNKNOWN}</span>
      )}
    </div>
  );
}
