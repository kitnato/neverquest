import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { resourcesBalance, coins } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";
import { SKILLS } from "@neverquest/utilities/constants-skills";

export default function TrainSkillButton({ type }: { type: SkillType }) {
  const coinsValue = useRecoilValue(coins);
  const balanceResources = useSetRecoilState(resourcesBalance);
  const setSkill = useSetRecoilState(skills(type));

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

            setSkill((current) => ({
              ...current,
              isAcquired: true,
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
