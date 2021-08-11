import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Github } from "react-bootstrap-icons";

import About from "components/About";
import Reset from "components/Reset";
import Settings from "components/Settings";
import { version } from "../../package.json";

export default function Header({ resetSeed }) {
  const [resetShow, setResetShow] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand>
          <span className="mr-2">neverquest</span>
          <Settings className="mx-3" />
          <About />
        </Navbar.Brand>

        <Nav className="d-none d-sm-block ml-auto mr-auto" />

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0 }}>
          <Nav style={{ flexDirection: "row" }}>
            <Badge variant="light" className="mr-2 align-self-center">
              v{version}
            </Badge>

            <Button
              variant="outline-light"
              href="https://www.github.com/cneuro/neverquest"
              className="d-flex mr-3"
              style={{ alignItems: "center" }}
            >
              <Github className="mr-1" /> Source
            </Button>

            <Button variant="outline-danger" onClick={() => setResetShow(true)}>
              Reset
            </Button>

            <Reset
              show={resetShow}
              setHide={() => setResetShow(false)}
              resetSeed={resetSeed}
              title="Reset the game?"
              message="This will wipe all data and restart from the beginning."
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
