import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { Clock, Plus } from "react-bootstrap-icons";
import { useSetRecoilState, useRecoilState, useRecoilValue, RecoilState } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIFloatingTextType, UIVariant } from "neverquest/env";
// TODO - every attribute needs its own icon
import placeholderIcon from "neverquest/icons/abstract-049.svg";
import { Attribute as AttributeType } from "neverquest/env";
import { characterLevel, experienceAvailable, experienceSpent } from "neverquest/state/character";
import { deltaCharacterLevel, deltaExperienceSpent } from "neverquest/state/deltas";
import { showCharacterLevel } from "neverquest/state/show";
import { getTriangularNumber } from "neverquest/utilities/helpers";

export default function Attribute({ atom }: { atom: RecoilState<AttributeType> }) {
  const setCharacterLevel = useSetRecoilState(characterLevel);
  const setDeltaCharacterLevel = useSetRecoilState(deltaCharacterLevel);
  const setExperienceSpent = useSetRecoilState(experienceSpent);
  const setDeltaExperienceSpent = useSetRecoilState(deltaExperienceSpent);
  const [attributeValue, setAttribute] = useRecoilState(atom);
  const [showCharacterLevelValue, setShowCharacterLevel] = useRecoilState(showCharacterLevel);
  const experienceAvailableValue = useRecoilValue(experienceAvailable);

  const { canAssign, cost, description, name, points } = attributeValue;
  const canIncrease = cost <= experienceAvailableValue;

  if (!canAssign) {
    return null;
  }

  // TODO - make into a hook?
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
    setDeltaCharacterLevel({ color: UIFloatingTextType.Positive, value: "+1" });
    setExperienceSpent((currentExperienceSpent) => currentExperienceSpent + cost);
    setDeltaExperienceSpent({ color: UIFloatingTextType.Positive, value: `+${cost}` });

    if (!showCharacterLevelValue) {
      setShowCharacterLevel(true);
    }
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={placeholderIcon} tooltip={name} />

      <span style={{ width: 260 }}>{description}</span>

      <span style={{ width: 20 }}>{points}</span>

      <OverlayTrigger overlay={<Tooltip>{`Cost: ${cost} XP`}</Tooltip>} placement="top">
        <span className="d-inline-block">
          <Button disabled={!canIncrease} onClick={onLevelUp} variant={UIVariant.Outline}>
            {canIncrease ? <Plus size={24} /> : <Clock size={24} />}
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
