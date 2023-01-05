import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import DeflectionChance from "@neverquest/components/Statistics/DeflectionChance";
import FreeBlockChance from "@neverquest/components/Statistics/FreeBlockChance";
import SkipRecoveryChance from "@neverquest/components/Statistics/SkipRecoveryChance";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";

export default function () {
  const isShowingDeflection = useRecoilValue(isShowing(ShowingType.Deflection));
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));
  const shieldsSkill = useRecoilValue(skills(SkillType.Shields));

  if (!armorsSkill && !shieldsSkill && !isShowingDeflection) {
    return null;
  }

  return (
    <Row>
      <Col>
        <SkipRecoveryChance />
      </Col>

      <Col>
        <FreeBlockChance />
      </Col>

      <Col>
        <DeflectionChance />
      </Col>
    </Row>
  );
}
