import Container from "react-bootstrap/Container";
import { RecoilRoot } from "recoil";

import CheatQuest from "@neverquest/components/CheatQuest";
import Header from "@neverquest/components/Header";
import Main from "@neverquest/components/Main";
import { initialization } from "@neverquest/state/global";
import { SeedContext, useSeed } from "@neverquest/state/SeedContext";

export default function App() {
  const { seed, resetSeed } = useSeed();

  return (
    <SeedContext.Provider value={resetSeed}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(initialization, null);
        }}
        key={seed}
      >
        <CheatQuest />

        <Header />

        <Container>
          <Main />
        </Container>
      </RecoilRoot>
    </SeedContext.Provider>
  );
}
