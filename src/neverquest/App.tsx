import { Provider } from "jotai";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";

import Header from "neverquest/components/Header";
import Layout from "neverquest/components/Layout";

export default function App() {
  const [seed, setSeed] = useState(uuidv4());

  const resetSeed = () => setSeed(uuidv4());

  return (
    <Provider key={seed}>
      <Header resetSeed={resetSeed} />

      <Container>
        <Layout resetSeed={resetSeed} />
      </Container>
    </Provider>
  );
}
