import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ImageIcon from "components/ImageIcon";
import placeholderIcon from "icons/abstract-049.svg";
import {
  attributesAvailable,
  attributeCost,
  characterLevel,
  experience,
} from "state/character";

export default function Attribute({ atom }) {
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const setExperience = useSetRecoilState(experience);
  const [attributeValue, setAttribute] = useRecoilState(atom);
  const attributesAvailableValue = useRecoilValue(attributesAvailable);
  const attributeCostValue = useRecoilValue(attributeCost);
  const { description, name, points } = attributeValue;

  const onLevelUp = () => {
    setAttribute((currentAttribute) => ({
      ...currentAttribute,
      points: currentAttribute.points + 1,
    }));
    setCharacterLevel((currentCharacterLevel) => currentCharacterLevel + 1);
    setExperience((currentExperience) => ({
      ...currentExperience,
      spent: currentExperience.spent + attributeCostValue,
    }));
  };

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={placeholderIcon} tooltip={name} />

      <span style={{ width: 250 }}>{description}</span>

      <span>{points}</span>

      {attributesAvailableValue > 0 && (
        <Button onClick={onLevelUp} variant="outline-dark">
          <Plus />
        </Button>
      )}
    </div>
  );
}
