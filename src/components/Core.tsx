import { Container } from "react-bootstrap";
import { RecoilRoot } from "recoil";

import { CheatQuest } from "@neverquest/components/CheatQuest";
import { Header } from "@neverquest/components/Header";
import { Initializer } from "@neverquest/components/Initializer";
import { Layout } from "@neverquest/components/Layout";
import { SeedContext, useSeed } from "@neverquest/state/seed";

export function Core() {
  const { resetSeed, seed } = useSeed();

  return (
    <SeedContext.Provider value={resetSeed}>
      <RecoilRoot key={seed}>
        <Initializer>
          <CheatQuest />

          <Header />

          <Container>
            <Layout />
          </Container>
        </Initializer>
      </RecoilRoot>
    </SeedContext.Provider>
  );
}
