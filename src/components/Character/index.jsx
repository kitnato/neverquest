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
import HealthRegen from "components/Character/HealthRegen";
import Name from "components/Character/Name";
import Resources from "components/Character/Resources";
import Stamina from "components/Character/Stamina";
import StaminaRegen from "components/Character/StaminaRegen";

export default function Character() {
  return (
    <Card>
      <Card.Body>
        <div className="mb-3">
          <Name />
        </div>

        <Row className="mb-3" noGutters>
          <Col xs={8}>
            <Health />
          </Col>

          <Col xs={4}>
            <HealthRegen />
          </Col>
        </Row>

        <Row className="mb-3" noGutters>
          <Col xs={8}>
            <Stamina />
          </Col>

          <Col xs={4}>
            <StaminaRegen />
          </Col>
        </Row>

        <Row className="mb-3" noGutters>
          <Col xs={2}>
            <Damage />
          </Col>

          <Col xs={2}>
            <Armor />
          </Col>

          <Col xs={2}>
            <Block />
          </Col>

          <Col xs={2}>
            <Dodge />
          </Col>

          <Col xs={4}>
            <Attack />

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
