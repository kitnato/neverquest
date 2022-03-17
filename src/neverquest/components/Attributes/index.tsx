import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import AttributesList from "neverquest/components/Attributes/AttributesList";
import Experience from "neverquest/components/Character/Experience";
import ExperienceAvailable from "neverquest/components/Character/ExperienceAvailable";
import ExperienceSpent from "neverquest/components/Character/ExperienceSpent";
import Level from "neverquest/components/Character/Level";

export default function Attributes() {
  return (
    <Stack gap={5}>
      <Stack gap={3} style={{ position: "sticky" }}>
        <Row>
          <Col>
            <Level />
          </Col>

          <Col>
            <Experience />
          </Col>

          <Col>
            <ExperienceSpent />
          </Col>

          <Col>
            <ExperienceAvailable />
          </Col>
        </Row>
      </Stack>

      <AttributesList />
    </Stack>
  );
}
