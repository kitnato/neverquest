import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { essence } from "@neverquest/state/resources";
import { skillPrice } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";
import { LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";

export function TrainSkillButton({ type }: { type: Skill }) {
  const essenceValue = useRecoilValue(essence);
  const skillPriceValue = useRecoilValue(skillPrice);

  const acquireSkill = useAcquireSkill();
  const transactEssence = useTransactEssence();

  const isAffordable = skillPriceValue <= essenceValue;

  const handleTrain = () => {
    acquireSkill(type);
    transactEssence(-skillPriceValue);
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
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
