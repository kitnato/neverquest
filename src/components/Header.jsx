import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import { Github } from "react-bootstrap-icons";

import About from "components/About";
import Reset from "components/Reset";
import Settings from "components/Settings";
import * as packageInfo from "../../package.json";

export default function Header({ resetSeed }) {
  const [resetShow, setResetShow] = useState(false);
  const { version } = packageInfo;

  return (
    <Navbar
      bg="dark"
      collapseOnSelect
      className="mb-4"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <Stack direction="horizontal" gap={3}>
            <span>neverquest</span>

            <Settings />

            <About />
          </Stack>
        </Navbar.Brand>

        <Nav className="d-none d-sm-block ml-auto mr-auto" />

        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Badge bg="light" text="dark">
              v{version}
            </Badge>

            <Button
              href="https://www.github.com/cneuro/neverquest"
              variant="outline-light"
            >
              <Github /> Source
            </Button>

            <Button onClick={() => setResetShow(true)} variant="outline-danger">
              Reset
            </Button>

            <Reset
              message="This will wipe all data and restart from the beginning."
              resetSeed={resetSeed}
              show={resetShow}
              setHide={() => setResetShow(false)}
              title="Reset the game?"
            />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
