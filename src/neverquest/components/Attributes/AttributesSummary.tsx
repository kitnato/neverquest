import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import CharacterLevel from "neverquest/components/Character/CharacterLevel";
import Experience from "neverquest/components/Character/Experience";
import { UIAnimationType } from "neverquest/env";
import { showAttributes } from "neverquest/state/show";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function AttributesSummary() {
  const showAttributesValue = useRecoilValue(showAttributes);

  if (!showAttributesValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass(UIAnimationType.FlipInX)}>
      <Card.Body>
        <Stack direction="horizontal" gap={5}>
          <CharacterLevel />

          <Experience />
        </Stack>
      </Card.Body>
    </Card>
  );
}
