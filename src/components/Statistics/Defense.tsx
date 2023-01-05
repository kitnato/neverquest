import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import BlockChance from "@neverquest/components/Statistics/BlockChance";
import DodgeChance from "@neverquest/components/Statistics/DodgeChance";
import ParryChance from "@neverquest/components/Statistics/ParryChance";
import Protection from "@neverquest/components/Statistics/Protection";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";

export default function () {
  const isShowingBlockChance = useRecoilValue(isShowing(ShowingType.BlockChance));
  const isShowingProtection = useRecoilValue(isShowing(ShowingType.Protection));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (!dodgeSkill && !isShowingBlockChance && !isShowingProtection) {
    return null;
  }

  return (
    <Row>
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
