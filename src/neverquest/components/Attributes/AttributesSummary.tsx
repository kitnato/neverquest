import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import CharacterLevel from "neverquest/components/Character/CharacterLevel";
import Experience from "neverquest/components/Character/Experience";
import { experience } from "neverquest/state/character";
import { showAttributes } from "neverquest/state/show";

export default function AttributesSummary() {
  const [showAttributesValue, setShowAttributes] = useRecoilState(showAttributes);
  const experienceValue = useRecoilValue(experience);

  useEffect(() => {
    if (experienceValue > 0 && !showAttributesValue) {
      setShowAttributes(true);
    }
  }, [experienceValue, showAttributesValue]);

  if (!showAttributesValue) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Stack direction="horizontal" gap={5}>
          <CharacterLevel />

          <Experience />
        </Stack>
      </Card.Body>
    </Card>
  );
}
