import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { SKILLS } from "@neverquest/data/skills";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coins } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/enums";

export function TrainSkillButton({ type }: { type: Skill }) {
  const coinsValue = useRecoilValue(coins);
  const setSkill = useSetRecoilState(skills(type));

  const transactResources = useTransactResources();

  const { coinPrice } = SKILLS[type];
  const isAffordable = coinPrice <= coinsValue;

  const handleTrain = () => {
    setSkill(true);
    transactResources({ coinsDifference: -coinPrice });
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>Not enough coins!</Tooltip>}
      trigger={isAffordable ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button disabled={!isAffordable} onClick={handleTrain} variant="outline-dark">
          Train
        </Button>
      </span>
    </OverlayTrigger>
  );
}
