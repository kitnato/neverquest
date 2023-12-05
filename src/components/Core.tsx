import { RecoilRoot } from "recoil";

import { CheatQuest } from "@neverquest/components/CheatQuest";
import { Header } from "@neverquest/components/Header";
import { Initializer } from "@neverquest/components/Initializer";
import { Layout } from "@neverquest/components/Layout";
import { ScreenMessage } from "@neverquest/components/ScreenMessage";
import { SeedContext, useSeed } from "@neverquest/state/seed";
import { isLocalStorageAvailable } from "@neverquest/utilities/helpers";

export function Core() {
  const { resetSeed, seed } = useSeed();

  if (!isLocalStorageAvailable()) {
    return <ScreenMessage>Requires browser localStorage to be enabled.</ScreenMessage>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (window.Worker === undefined) {
    return <ScreenMessage>Requires Web Workers to be enabled.</ScreenMessage>;
  }

  return (
    <SeedContext.Provider value={resetSeed}>
      <RecoilRoot key={seed}>
        <Initializer>
          <CheatQuest />

          <Header />

          <Layout />
        </Initializer>
      </RecoilRoot>
    </SeedContext.Provider>
  );
}
