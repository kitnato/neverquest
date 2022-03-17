import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { Clock, Plus } from "react-bootstrap-icons";
import { useSetRecoilState, useRecoilState, useRecoilValue, RecoilState } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import placeholderIcon from "neverquest/icons/abstract-049.svg";
import { Attribute } from "neverquest/env.d";
import { characterLevel, experienceAvailable, experienceSpent } from "neverquest/state/character";
import { getTriangularNumber } from "neverquest/utilities/helpers";

export default function Attribute({ atom }: { atom: RecoilState<Attribute> }) {
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const setExperienceSpent = useSetRecoilState(experienceSpent);
  const [attributeValue, setAttribute] = useRecoilState(atom);
  const experienceAvailableValue = useRecoilValue(experienceAvailable);

  const { canAssign, cost, description, name, points } = attributeValue;
  const canIncrease = cost <= experienceAvailableValue;

  if (!canAssign) {
    return null;
  }

  const onLevelUp = () => {
    setAttribute((currentAttribute) => {
      const newPoints = currentAttribute.points + 1;

      return {
        ...currentAttribute,
        cost: getTriangularNumber(newPoints + 1),
        points: newPoints,
      };
    });
    setCharacterLevel((currentCharacterLevel) => currentCharacterLevel + 1);
    setExperienceSpent((currentExperienceSpent) => currentExperienceSpent + cost);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={placeholderIcon} tooltip={name} />

      <span style={{ width: 200 }}>{description}</span>

      <span style={{ width: 20 }}>{points}</span>

      <OverlayTrigger overlay={<Tooltip>{`Cost: ${cost} experience`}</Tooltip>} placement="top">
        <span className="d-inline-block">
          <Button disabled={!canIncrease} onClick={onLevelUp} variant={UIVariant.Outline}>
            {canIncrease ? <Plus size={24} /> : <Clock size={24} />}
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
