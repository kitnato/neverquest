import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Block } from "@neverquest/components/Statistics/Block";
import { Dodge } from "@neverquest/components/Statistics/Dodge";
import { Parry } from "@neverquest/components/Statistics/Parry";
import { Protection } from "@neverquest/components/Statistics/Protection";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { Showing, Skill } from "@neverquest/types/enums";

export function Defense() {
  const isShowingBlock = useRecoilValue(isShowing(Showing.Block));
  const isShowingProtection = useRecoilValue(isShowing(Showing.Protection));
  const dodgeSkill = useRecoilValue(skills(Skill.Evasion));

  if (!dodgeSkill && !isShowingBlock && !isShowingProtection) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Protection />
      </Col>

      <Col>
        <Block />
      </Col>

      <Col>
        <Dodge />
      </Col>

      <Col>
        <Parry />
      </Col>
    </Row>
  );
}
