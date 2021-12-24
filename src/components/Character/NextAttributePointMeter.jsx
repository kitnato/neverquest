import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import {
  attributesAvailable,
  characterLevel,
  experience,
} from "state/character";

export default function NextAttributePointMeter() {
  const attributesAvailableValue = useRecoilValue(attributesAvailable);
  const characterLevelValue = useRecoilValue(characterLevel);
  const experienceValue = useRecoilValue(experience);

  const totalAttributePoints = attributesAvailableValue + characterLevelValue;
  const base = totalAttributePoints ** 2;
  const current = experienceValue - base;
  const required = (1 + totalAttributePoints) ** 2 - base;

  return (
    <Progress
      label={`${current}/${required}`}
      value={(current / required) * 100}
      variant="secondary"
    />
  );
}
