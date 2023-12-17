import { Badge, Container, Nav, Navbar, NavbarBrand, Stack } from "react-bootstrap";

import { About } from "@neverquest/components/Header/About";
import { Ouroboros } from "@neverquest/components/Header/Ouroboros";
import { Restart } from "@neverquest/components/Header/Restart";
import { Settings } from "@neverquest/components/Header/Settings";
import { version } from "@neverquest/config";

export function Header() {
  return (
    <Navbar bg="dark" className="mb-4" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Stack direction="horizontal" gap={3}>
          <Ouroboros />

          <div>
            <NavbarBrand>neverquest</NavbarBrand>

            <Badge bg="light" text="dark">
              v{version}
            </Badge>
          </div>
        </Stack>

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
