import { Badge, Container, Nav, Navbar, Stack } from "react-bootstrap";

import { About } from "@neverquest/components/Header/About";
import { Restart } from "@neverquest/components/Header/Restart";
import { Settings } from "@neverquest/components/Header/Settings";
import { version } from "@neverquest/config";

export function Header() {
  return (
    <Navbar bg="dark" className="mb-4" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Stack direction="horizontal" gap={5}>
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

            <Restart />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
