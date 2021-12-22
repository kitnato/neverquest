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
  const baseExperience = totalAttributePoints ** 2;
  const requiredExperience = (1 + totalAttributePoints) ** 2;
  const currentDifference = experienceValue - baseExperience;

  return (
    <Progress
      label={`${currentDifference}/${requiredExperience}`}
      value={(currentDifference / requiredExperience) * 100}
      variant="secondary"
    />
  );
}
