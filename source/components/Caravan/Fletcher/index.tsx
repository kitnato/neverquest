import { useRecoilState } from "recoil";

import { FletcherAmmunition } from "@neverquest/components/Caravan/Fletcher/FletcherAmmunition";
import { RangedOptions } from "@neverquest/components/Caravan/Fletcher/RangedOptions";
import { IconTabs } from "@neverquest/components/IconTabs";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import { fletcherOptions } from "@neverquest/state/caravan";

export function Fletcher() {
  const [{ activeTab }, setFletcherOptions] = useRecoilState(fletcherOptions);

  return (
    <IconTabs
      activeKey={activeTab}
      onSelect={(key) => {
        if (key !== null) {
          setFletcherOptions((options) => ({ ...options, activeTab: key }));
        }
      }}
      tabs={[
        { Component: RangedOptions, Icon: IconRanged, label: "ranged" },
        { Component: FletcherAmmunition, Icon: IconAmmunition, label: "ammunition" },
      ]}
    />
  );
}
