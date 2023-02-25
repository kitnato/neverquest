import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { SKILLS } from "@neverquest/data/skills";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coins } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export function TrainSkillButton({ type }: { type: SkillType }) {
  const coinsValue = useRecoilValue(coins);
  const setSkill = useSetRecoilState(skills(type));

  const transactResources = useTransactResources();

  const { coinPrice } = SKILLS[type];
  const isAffordable = coinPrice <= coinsValue;

  return (
    <OverlayTrigger
      overlay={<Tooltip>{!isAffordable && <>Not enough coins!</>}</Tooltip>}
      placement="top"
      trigger={isAffordable ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button
          disabled={!isAffordable}
          onClick={({ currentTarget }) => {
            currentTarget.blur();

            setSkill(true);
            transactResources({ coinsDifference: -coinPrice });
          }}
          variant={UIVariant.Outline}
        >
          Train
        </Button>
      </span>
    </OverlayTrigger>
  );
}
