import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import AttributesList from "neverquest/components/Attributes/AttributesList";
import Experience from "neverquest/components/Character/Experience";
import ExperienceSpent from "neverquest/components/Character/ExperienceSpent";
import CharacterLevel from "neverquest/components/Character/CharacterLevel";

export default function Attributes() {
  return (
    <Stack gap={5}>
      <Stack gap={3} style={{ position: "sticky" }}>
        <Row>
          <Col>
            <CharacterLevel />
          </Col>

          <Col>
            <Experience />
          </Col>

          <Col xs={6}>
            <ExperienceSpent />
          </Col>
        </Row>
      </Stack>

      <AttributesList />
    </Stack>
  );
}
