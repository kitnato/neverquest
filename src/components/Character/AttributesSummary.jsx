import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import Experience from "components/Character/Experience";
import Level from "components/Character/Level";
import { experience } from "state/character";
import { show } from "state/global";

export default function AttributesSummary() {
  const [showValue, setShow] = useRecoilState(show);
  const experienceValue = useRecoilValue(experience);

  useEffect(() => {
    if (experienceValue > 0 && !showValue.attributes) {
      setShow({ ...showValue, attributes: true });
    }
  }, [experienceValue, setShow, showValue]);

  if (!showValue.attributes) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Stack direction="horizontal" gap={5}>
          <Level />

          <Experience />
        </Stack>
      </Card.Body>
    </Card>
  );
}
