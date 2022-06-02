import { MouseEvent, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import { ExclamationTriangle, Github } from "react-bootstrap-icons";

import About from "neverquest/components/About";
import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import Settings from "neverquest/components/Settings";
import useReset from "neverquest/hooks/useReset";

export default function Header() {
  const [isResetShowing, setResetShowing] = useState(false);

  const reset = useReset();

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
              <ExclamationTriangle /> Restart
            </Button>

            <ConfirmationDialog
              confirmationLabel="Restart"
              onConfirm={reset}
              message="This will reset all progress and restart from the beginning."
              setHide={() => setResetShowing(false)}
              show={isResetShowing}
              title="Start a new quest?"
            />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
