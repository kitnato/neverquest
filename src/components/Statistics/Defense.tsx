import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Block } from "@neverquest/components/Statistics/Block";
import { Dodge } from "@neverquest/components/Statistics/Dodge";
import { Parry } from "@neverquest/components/Statistics/Parry";
import { Protection } from "@neverquest/components/Statistics/Protection";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

export function Defense() {
  const isShowingDefense = useRecoilValue(isShowing(Showing.Defense));

  if (!isShowingDefense) {
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
