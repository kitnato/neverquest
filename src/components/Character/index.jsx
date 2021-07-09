import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Armor from "components/Character/Armor";
import Attack from "components/Character/Attack";
import AttackButton from "components/Character/AttackButton";
import Block from "components/Character/Block";
import Damage from "components/Character/Damage";
import Dodge from "components/Character/Dodge";
import Experience from "components/Character/Experience";
import Health from "components/Character/Health";
import Name from "components/Character/Name";
import Resources from "components/Character/Resources";
import Stamina from "components/Character/Stamina";

export default function Character() {
  return (
    <Card>
      <Card.Body className="spaced">
        <Name />

        <Health />

        <Stamina />

        <Row>
          <Col>
            <Damage />
          </Col>

          <Col>
            <Armor />
          </Col>

          <Col>
            <Block />
          </Col>

          <Col>
            <Dodge />
          </Col>
        </Row>

        <Row>
          <Col>
            <Attack />
          </Col>

          <Col>
            <AttackButton />
          </Col>
        </Row>

        <Row>
          <Col>
            <Experience />
          </Col>

          <Resources />
        </Row>
      </Card.Body>
    </Card>
  );
}
