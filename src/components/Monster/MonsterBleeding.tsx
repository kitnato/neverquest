import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import { canReceiveAilment } from "@neverquest/state/monster";

export function MonsterBleeding() {
  const canReceiveBleeding = useRecoilValue(canReceiveAilment("bleeding"));

  if (!canReceiveBleeding) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
