import Container from "react-bootstrap/Container";

import Header from "neverquest/components/Header";
import Main from "neverquest/components/Main";

export default function App() {
  return (
    <>
      <Header />

      <Container>
        <Main />
      </Container>
    </>
  );
}
