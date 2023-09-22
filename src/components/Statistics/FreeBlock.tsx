import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFreeBlock } from "@neverquest/icons/free-block.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function FreeBlock() {
  const stability = masteryStatistic("stability");

  const shieldcraftValue = useRecoilValue(skills("shieldcraft"));
  const stabilityValue = useRecoilValue(stability);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("stability"),
    value: stability,
  });

  if (
    !shieldcraftValue ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip !== "one-handed")
  ) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatPercentage(stabilityValue)}</span>

          <FloatingText deltaType="stability" />
        </Stack>
      }
      Icon={IconFreeBlock}
      isAnimated
      tooltip="Chance for 0-stamina block"
    />
  );
}
