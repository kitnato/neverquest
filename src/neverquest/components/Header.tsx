import { MouseEvent, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import { ExclamationTriangle, Github } from "react-bootstrap-icons";

import About from "neverquest/components/About";
import Reset from "neverquest/components/Reset";
import Settings from "neverquest/components/Settings";

export default function Header() {
  const [isResetShowing, setResetShowing] = useState(false);

  return (
    <Navbar bg="dark" collapseOnSelect className="mb-4" expand="lg" variant="dark">
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
              v{process.env.REACT_APP_VERSION}
            </Badge>

            <Button href="https://www.github.com/cneuro/neverquest" variant="outline-light">
              <Github /> Source
            </Button>

            <Button
              onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                currentTarget.blur();

                setResetShowing(true);
              }}
              variant="outline-light"
            >
              <ExclamationTriangle /> Reset
            </Button>

            <Reset
              message="This will wipe all data and restart from the beginning."
              show={isResetShowing}
              setHide={() => setResetShowing(false)}
              title="Reset the game?"
            />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
