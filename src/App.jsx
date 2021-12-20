import { useState } from "react";
import Container from "react-bootstrap/Container";
import { RecoilRoot } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Header from "components/Header";
import Layout from "components/Layout";

export default function App() {
  const [seed, setSeed] = useState(uuidv4());

  const resetSeed = () => setSeed(uuidv4());

  return (
    <>
      <Header resetSeed={resetSeed} />

      <Container>
        <RecoilRoot key={seed}>
          <Layout resetSeed={resetSeed} />
        </RecoilRoot>
      </Container>
    </>
  );
}
