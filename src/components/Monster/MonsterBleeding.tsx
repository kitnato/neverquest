import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { bleed } from "@neverquest/state/statistics";

export function MonsterBleeding() {
  const bleedValue = useRecoilValue(bleed);
  const isShowingBleed = useRecoilValue(isShowing("bleed"));

  if (bleedValue === 0 || !isShowingBleed) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
