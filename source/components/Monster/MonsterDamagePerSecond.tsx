import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react";
import { monsterDamageAilingPerSecond } from "@neverquest/state/monster";
import { isSettingActive } from "@neverquest/state/settings";

export function MonsterDamagePerSecond() {
  const isSettingActiveValue = useRecoilValue(isSettingActive("damagePerSecond"));
  const monsterDamageAilingPerSecondValue = useRecoilValue(monsterDamageAilingPerSecond);

  if (isSettingActiveValue) {
    return (
      <IconDisplay
        className="text-nowrap"
        Icon={IconDamagePerSecond}
        iconProps={{ className: "small", overlayPlacement: "bottom" }}
        tooltip="Monster damage per second"
      >
        {monsterDamageAilingPerSecondValue}
      </IconDisplay>
    );
  }
}
