import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SKILLS } from "@neverquest/data/skills";
import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coins } from "@neverquest/state/resources";
import type { Skill } from "@neverquest/types/unions";

export function TrainSkillButton({ type }: { type: Skill }) {
  const coinsValue = useRecoilValue(coins);

  const acquireSkill = useAcquireSkill();
  const transactResources = useTransactResources();

  const { coinPrice } = SKILLS[type];
  const isAffordable = coinPrice <= coinsValue;

  const handleTrain = () => {
    acquireSkill(type);
    transactResources({ coinsDifference: -coinPrice });
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>Not enough coins!</Tooltip>}
      trigger={isAffordable ? [] : ["hover", "focus"]}
    >
      <span>
        <Button disabled={!isAffordable} onClick={handleTrain} variant="outline-dark">
          Train
        </Button>
      </span>
    </OverlayTrigger>
  );
}
