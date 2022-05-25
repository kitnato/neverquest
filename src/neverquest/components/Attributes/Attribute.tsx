import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { Clock, Plus } from "react-bootstrap-icons";
import { PrimitiveAtom, useSetAtom, useAtom, useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
// TODO - every attribute needs its own icon
import placeholderIcon from "neverquest/icons/abstract-049.svg";
import { Attribute as AttributeType } from "neverquest/types/core";
import { characterLevel, experienceAvailable, experienceSpent } from "neverquest/state/character";
import { deltaCharacterLevel, deltaExperienceSpent } from "neverquest/state/deltas";
import { showCharacterLevel } from "neverquest/state/show";
import { FloatingTextType, UIVariant } from "neverquest/types/ui";
import { getTriangularNumber } from "neverquest/utilities/helpers";

export default function Attribute({ atom }: { atom: PrimitiveAtom<AttributeType> }) {
  const setCharacterLevel = useSetAtom(characterLevel);
  const setDeltaCharacterLevel = useSetAtom(deltaCharacterLevel);
  const setExperienceSpent = useSetAtom(experienceSpent);
  const setDeltaExperienceSpent = useSetAtom(deltaExperienceSpent);
  const [attributeValue, setAttribute] = useAtom(atom);
  const [showCharacterLevelValue, setShowCharacterLevel] = useAtom(showCharacterLevel);
  const experienceAvailableValue = useAtomValue(experienceAvailable);

  const { canAssign, cost, description, name, points } = attributeValue;
  const canIncrease = cost <= experienceAvailableValue;

  if (!canAssign) {
    return null;
  }

  // TODO - make into a hook?
  const onLevelUp = () => {
    setAttribute((current) => {
      const newPoints = current.points + 1;

      return {
        ...current,
        cost: getTriangularNumber(newPoints + 1),
        points: newPoints,
      };
    });
    setCharacterLevel((current) => current + 1);
    setDeltaCharacterLevel({ color: FloatingTextType.Positive, value: "+1" });
    setExperienceSpent((current) => current + cost);
    setDeltaExperienceSpent({ color: FloatingTextType.Positive, value: `+${cost}` });

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
