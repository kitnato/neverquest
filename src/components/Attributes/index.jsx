import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import AttributesList from "components/Attributes/AttributesList";
import Experience from "components/Character/Experience";
import ExperienceSpent from "components/Character/ExperienceSpent";
import Level from "components/Character/Level";

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
        </Row>
      </Stack>

      <AttributesList />
    </Stack>
  );
}
