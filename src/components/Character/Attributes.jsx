import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilState, useRecoilValue } from "recoil";

import AttributesAvailable from "components/Attributes/AttributesAvailable";
import Experience from "components/Character/Experience";
import Level from "components/Character/Level";
import { experience } from "state/character";
import { show } from "state/global";

export default function Attributes() {
  const [showValue, setShow] = useRecoilState(show);
  const experienceValue = useRecoilValue(experience);

  useEffect(() => {
    if (experienceValue.total > 0 && !showValue.attributes) {
      setShow({ ...showValue, attributes: true });
    }
  }, [experienceValue, setShow, showValue]);

  if (!showValue.attributes) {
    return null;
  }

  return (
    <Card>
      <Card.Body className="spaced-vertical">
        <Row>
          <Col>
            <Experience />
          </Col>

          <Col>
            <Level />
          </Col>

          <Col>
            <AttributesAvailable />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
