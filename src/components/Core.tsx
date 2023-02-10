import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { RecoilRoot } from "recoil";

import { CheatQuest } from "@neverquest/components/CheatQuest";
import { Header } from "@neverquest/components/Header";
import { Initializer } from "@neverquest/components/Initializer";
import { Layout } from "@neverquest/components/Layout";
import { SeedContext, useSeed } from "@neverquest/state/SeedContext";

export function Core() {
  const { resetSeed, seed } = useSeed();

  useEffect(() => {
    // TODO - extend to replace a path of any length
    window.history.replaceState({}, document.title, "/");
  }, []);

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
