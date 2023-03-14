import { useRecoilValue } from "recoil";

import { PoisonedMeter } from "@neverquest/components/Character/PoisonedMeter";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconPoisoned } from "@neverquest/icons/tear-tracks.svg";
import { poisonDuration } from "@neverquest/state/character";

export function Poisoned() {
  const poisonDurationValue = useRecoilValue(poisonDuration);

  if (poisonDurationValue === 0) {
    return null;
  }

  return <IconDisplay contents={<PoisonedMeter />} Icon={IconPoisoned} tooltip="Poisoned" />;
}
