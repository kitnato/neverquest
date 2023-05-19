import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { Stability } from "@neverquest/components/Statistics/Stability";
import { Tenacity } from "@neverquest/components/Statistics/Tenacity";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { ShowingType, SkillType } from "@neverquest/types/enums";

export function Support() {
  const isShowingDeflection = useRecoilValue(isShowing(ShowingType.Deflection));
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));
  const shieldsSkill = useRecoilValue(skills(SkillType.Shields));

  if (!armorsSkill && !shieldsSkill && !isShowingDeflection) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Tenacity />
      </Col>

      <Col>
        <Stability />
      </Col>

      <Col>
        <Deflection />
      </Col>
    </Row>
  );
}
