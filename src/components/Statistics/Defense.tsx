import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Block } from "@neverquest/components/Statistics/Block";
import { Dodge } from "@neverquest/components/Statistics/Dodge";
import { Parry } from "@neverquest/components/Statistics/Parry";
import { Protection } from "@neverquest/components/Statistics/Protection";
import { isShowing } from "@neverquest/state/isShowing";

export function Defense() {
  const isShowingBlock = useRecoilValue(isShowing("block"));
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const isShowingParry = useRecoilValue(isShowing("parry"));
  const isShowingProtection = useRecoilValue(isShowing("protection"));

  if (!isShowingBlock && !isShowingDodge && !isShowingParry && !isShowingProtection) {
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
