import { Badge, Container, Nav, Navbar, Stack } from "react-bootstrap";

import { About } from "@neverquest/components/Header/About";
import { Restart } from "@neverquest/components/Header/Restart";
import { Settings } from "@neverquest/components/Header/Settings";
import { version } from "@neverquest/config";

export function Header() {
  return (
    <Navbar bg="dark" className="mb-4" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Stack direction="horizontal">
          <Navbar.Brand>
            <span>neverquest</span>
          </Navbar.Brand>

          <Badge bg="light" text="dark">
            v{version}
          </Badge>
        </Stack>

        <Nav className="d-none d-sm-block ml-auto mr-auto" />

        <Nav>
          <Stack direction="horizontal" gap={3}>
            <About />

            <Settings />

            <Restart />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
