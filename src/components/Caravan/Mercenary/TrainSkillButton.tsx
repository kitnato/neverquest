import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { SKILLS } from "@neverquest/constants/skills";
import { coins } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import { resourcesBalance } from "@neverquest/state/transactions/possessions";
import { SkillType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export default function ({ type }: { type: SkillType }) {
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

            setSkill(true);
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
