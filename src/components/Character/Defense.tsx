import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Block from "@neverquest/components/Character/Block";
import Dodge from "@neverquest/components/Character/Dodge";
import TotalProtection from "@neverquest/components/Character/TotalProtection";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const showBlockChanceValue = useRecoilValue(isShowing(ShowingType.BlockChance));
  const showTotalProtectionValue = useRecoilValue(isShowing(ShowingType.TotalProtection));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (!showBlockChanceValue && !showTotalProtectionValue && dodgeSkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <Row className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Col>
        <TotalProtection />
      </Col>

      <Col>
        <Block />
      </Col>

      <Col>
        <Dodge />
      </Col>
    </Row>
  );
}
