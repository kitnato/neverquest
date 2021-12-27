import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import AttributesAvailable from "components/Attributes/AttributesAvailable";
import AttributeCost from "components/Attributes/AttributeCost";
import AttributesList from "components/Attributes/AttributesList";
import Experience from "components/Character/Experience";
import ExperienceSpent from "components/Character/ExperienceSpent";
import Level from "components/Character/Level";
import NextAttributePoint from "components/Character/NextAttributePoint";

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
            <AttributeCost />
          </Col>

          <Col>
            <AttributesAvailable />
          </Col>
        </Row>

        <Row>
          <Col>
            <NextAttributePoint />
          </Col>
        </Row>
      </Stack>

      <AttributesList />
    </Stack>
  );
}
