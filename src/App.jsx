import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RecoilRoot } from "recoil";
import Container from "react-bootstrap/Container";

import Contents from "Contents";
import Header from "components/Header";

export default function App() {
  const [seed, setSeed] = useState(uuidv4());

  const resetSeed = () => setSeed(uuidv4());

  return (
    <div>
      <Header resetSeed={resetSeed} />

      <Container>
        <RecoilRoot key={seed}>
          <Contents resetSeed={resetSeed} />
        </RecoilRoot>
      </Container>
    </div>
  );
}
