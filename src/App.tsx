import Container from "react-bootstrap/Container";

import CheatQuest from "@neverquest/components/CheatQuest";
import Header from "@neverquest/components/Header";
import Main from "@neverquest/components/Main";

export default function App() {
  return (
    <>
      <CheatQuest />

      <Header />

      <Container>
        <Main />
      </Container>
    </>
  );
}
