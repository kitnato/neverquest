import { Badge, Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

import About from "@neverquest/components/Header/About";
import Restart from "@neverquest/components/Header/Restart";
import Settings from "@neverquest/components/Header/Settings";
import { version } from "@neverquest/config";

export default function () {
  return (
    <Navbar bg="dark" className="mb-4" collapseOnSelect expand="lg" variant="dark">
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

            <Button href="https://www.github.com/cneuro/neverquest" variant="outline-light">
              <Github /> Source
            </Button>

            <Restart />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
