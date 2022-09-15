import Container from "react-bootstrap/Container";
import { RecoilRoot } from "recoil";

import CheatQuest from "@neverquest/components/CheatQuest";
import Header from "@neverquest/components/Header";
import Initializer from "@neverquest/components/Initializer";
import Main from "@neverquest/components/Main";
import { SeedContext, useSeed } from "@neverquest/state/SeedContext";

export default function () {
  const { seed, resetSeed } = useSeed();
  return (
    <SeedContext.Provider value={resetSeed}>
      <RecoilRoot key={seed}>
        <Initializer>
          <CheatQuest />

          <Header />

          <Container>
            <Main />
          </Container>
        </Initializer>
      </RecoilRoot>
    </SeedContext.Provider>
  );
}
