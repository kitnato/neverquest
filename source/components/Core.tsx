import { nanoid } from "nanoid";
import { useState } from "react";
import { RecoilRoot } from "recoil";

import { CheatQuest } from "@neverquest/components/CheatQuest";
import { Glitch } from "@neverquest/components/Glitch";
import { Header } from "@neverquest/components/Header";
import { Initializer } from "@neverquest/components/Initializer";
import { Layout } from "@neverquest/components/Layout";
import { ScreenMessage } from "@neverquest/components/ScreenMessage";
import { SeedContext } from "@neverquest/state/seed";
import { isLocalStorageAvailable } from "@neverquest/utilities/helpers";

export function Core() {
  const [seed, setSeed] = useState(nanoid());

  if (!isLocalStorageAvailable()) {
    return <ScreenMessage>Requires browser localStorage to be enabled.</ScreenMessage>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (window.Worker === undefined) {
    return <ScreenMessage>Requires Web Workers to be enabled.</ScreenMessage>;
  }

  return (
    <SeedContext.Provider
      value={() => {
        setSeed(nanoid());
      }}
    >
      <RecoilRoot key={seed}>
        <Initializer>
          <CheatQuest />

          <Glitch />

          <Header />

          <Layout />
        </Initializer>
      </RecoilRoot>
    </SeedContext.Provider>
  );
}
