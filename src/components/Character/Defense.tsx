import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import BlockChance from "@neverquest/components/Character/BlockChance";
import DodgeChance from "@neverquest/components/Character/DodgeChance";
import ParryChance from "@neverquest/components/Character/ParryChance";
import Protection from "@neverquest/components/Character/Protection";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const isShowingBlockChance = useRecoilValue(isShowing(ShowingType.BlockChance));
  const isShowingProtection = useRecoilValue(isShowing(ShowingType.Protection));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (!dodgeSkill && !isShowingBlockChance && !isShowingProtection) {
    return null;
  }

  return (
    <Row className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Col>
        <Protection />
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
