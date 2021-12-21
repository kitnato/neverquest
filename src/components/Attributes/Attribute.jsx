import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Plus } from "react-bootstrap-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ImageIcon from "components/ImageIcon";
import placeholderIcon from "icons/abstract-049.svg";
import { attributesAvailable, characterLevel } from "state/character";

export default function Attribute({ atom }) {
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const [attributeValue, setAttribute] = useRecoilState(atom);
  const attributesAvailableValue = useRecoilValue(attributesAvailable);
  const { canAssign, description, name, points } = attributeValue;

  if (!canAssign) {
    return null;
  }

  const onLevelUp = () => {
    setAttribute((currentAttribute) => ({
      ...currentAttribute,
      points: currentAttribute.points + 1,
    }));
    setCharacterLevel((currentCharacterLevel) => currentCharacterLevel + 1);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={placeholderIcon} tooltip={name} />

      <span style={{ width: 200 }}>{description}</span>

      <span style={{ width: 20 }}>{points}</span>

      {attributesAvailableValue > 0 && (
        <Button onClick={onLevelUp} variant="outline-dark">
          <Plus />
        </Button>
      )}
    </Stack>
  );
}
