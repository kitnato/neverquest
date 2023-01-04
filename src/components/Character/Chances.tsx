import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Deflection from "@neverquest/components/Character/Deflection";
import FreeBlockChance from "@neverquest/components/Character/FreeBlockChance";
import SkipRecoveryChance from "@neverquest/components/Character/SkipRecoveryChance";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const isShowingDeflection = useRecoilValue(isShowing(ShowingType.Deflection));
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));
  const shieldsSkill = useRecoilValue(skills(SkillType.Shields));

  if (!armorsSkill && !shieldsSkill && !isShowingDeflection) {
    return null;
  }

  return (
    <Row className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Col>
        <SkipRecoveryChance />
      </Col>

      <Col>
        <FreeBlockChance />
      </Col>

      <Col>
        <Deflection />
      </Col>
    </Row>
  );
}
