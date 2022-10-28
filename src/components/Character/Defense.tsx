import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import BlockChance from "@neverquest/components/Character/BlockChance";
import DodgeChance from "@neverquest/components/Character/DodgeChance";
import ParryChance from "@neverquest/components/Character/ParryChance";
import TotalProtection from "@neverquest/components/Character/TotalProtection";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const showBlockChanceValue = useRecoilValue(isShowing(ShowingType.BlockChance));
  const showTotalProtectionValue = useRecoilValue(isShowing(ShowingType.TotalProtection));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (!dodgeSkill && !showBlockChanceValue && !showTotalProtectionValue) {
    return null;
  }

  return (
    <Row className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Col>
        <TotalProtection />
      </Col>

      <Col>
        <BlockChance />
      </Col>

      <Col>
        <DodgeChance />
      </Col>

      <Col>
        <ParryChance />
      </Col>
    </Row>
  );
}
