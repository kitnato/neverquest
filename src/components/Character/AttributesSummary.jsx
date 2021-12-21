import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import AttributesAvailable from "components/Attributes/AttributesAvailable";
import Experience from "components/Character/Experience";
import Level from "components/Character/Level";
import NextAttributePoint from "components/Character/NextAttributePoint";
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

          <div className="me-auto" style={{ width: "100%" }}>
            <NextAttributePoint />
          </div>

          <AttributesAvailable />
        </Stack>
      </Card.Body>
    </Card>
  );
}
