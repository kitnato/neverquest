import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilState, useRecoilValue } from "recoil";

import Experience from "components/Character/Experience";
import Level from "components/Character/Level";
import { experience } from "state/character";
import { show } from "state/global";

export default function Stats() {
  const [showValue, setShow] = useRecoilState(show);
  const experienceValue = useRecoilValue(experience);

  useEffect(() => {
    if (experienceValue > 0 && !showValue.stats) {
      setShow({ ...showValue, stats: true });
    }
  }, [experienceValue, setShow, showValue]);

  return (
    showValue.stats && (
      <Card>
        <Card.Body className="spaced-vertical">
          <Row>
            <Col>
              <Experience />
            </Col>

            <Col>
              <Level />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
}
