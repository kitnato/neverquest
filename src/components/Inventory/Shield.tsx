import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { showShield } from "@neverquest/state/show";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

// TODO
export default function Shield() {
  const shieldValue = useAtomValue(shield);
  const showShieldValue = useAtomValue(showShield);

  if (!showShieldValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ type: AnimationType.FlipInX })} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Shield" />

      <span>{shieldValue.name}</span>
    </Stack>
  );
}
