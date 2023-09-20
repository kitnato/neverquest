import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coins } from "@neverquest/state/resources";
import { skillPrice } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

export function TrainSkillButton({ type }: { type: Skill }) {
  const coinsValue = useRecoilValue(coins);
  const skillPriceValue = useRecoilValue(skillPrice);

  const acquireSkill = useAcquireSkill();
  const transactResources = useTransactResources();

  const isAffordable = skillPriceValue <= coinsValue;

  const handleTrain = () => {
    acquireSkill(type);
    transactResources({ coinsDifference: -skillPriceValue });
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>Insufficient coins!</Tooltip>}
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
