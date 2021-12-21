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
  // Tn
  const baseExperience =
    (totalAttributePoints * (totalAttributePoints + 1)) / 2;
  // n + 1
  const nextAttributePoints = totalAttributePoints + 1;
  // Tn + 1
  const requiredExperience =
    (nextAttributePoints * (nextAttributePoints + 1)) / 2;
  const currentDifference = experienceValue - baseExperience;
  const maxDifference = requiredExperience - baseExperience;

  return (
    <Progress
      label={`${currentDifference}/${maxDifference}`}
      value={(currentDifference / maxDifference) * 100}
      variant="secondary"
    />
  );
}
