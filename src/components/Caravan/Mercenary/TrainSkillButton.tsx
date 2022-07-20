import { useAtomValue, useSetAtom } from "jotai";
import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { resourcesBalance, coins } from "@neverquest/state/resources";
import { SkillType } from "@neverquest/types/core";
import { UIVariant } from "@neverquest/types/ui";
import { skills } from "@neverquest/state/skills";
import { SKILLS } from "@neverquest/utilities/constants-skills";

export default function TrainSkillButton({ type }: { type: SkillType }) {
  const coinsValue = useAtomValue(coins);
  const balanceResources = useSetAtom(resourcesBalance);
  const setSkills = useSetAtom(skills);

  const { price } = SKILLS[type];
  const isAffordable = price <= coinsValue;

  return (
    <OverlayTrigger
      overlay={<Tooltip>{!isAffordable && <>Not enough coins!</>}</Tooltip>}
      placement="top"
      trigger={isAffordable ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button
          disabled={!isAffordable}
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            setSkills((current) => ({
              ...current,
              [type]: {
                ...current[type],
                isAcquired: true,
              },
            }));
            balanceResources({ coinsDifference: -price });
          }}
          variant={UIVariant.Outline}
        >
          Train
        </Button>
      </span>
    </OverlayTrigger>
  );
}
