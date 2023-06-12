import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import { isShowing } from "@neverquest/state/isShowing";

export function MonsterBleeding() {
  const isShowingBleed = useRecoilValue(isShowing("bleed"));

  if (!isShowingBleed) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
