import { useRecoilState } from "recoil"

import { FletcherAmmunition } from "@neverquest/components/Caravan/Fletcher/FletcherAmmunition"
import { RangedOptions } from "@neverquest/components/Caravan/Fletcher/RangedOptions"
import { IconTabs } from "@neverquest/components/IconTabs"
import IconAmmunition from "@neverquest/icons/ammunition.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import { fletcherOptions } from "@neverquest/state/caravan"
import type { FletcherOption } from "@neverquest/types/unions"

export function Fletcher() {
  const [{ activeTab }, setFletcherOptions] = useRecoilState(fletcherOptions)

  return (
    <IconTabs<FletcherOption>
      activeKey={activeTab}
      onSelect={(key) => {
        setFletcherOptions((options) => ({ ...options, activeTab: key }))
      }}
      tabs={[
        { Component: RangedOptions, Icon: IconRanged, label: `ranged` },
        { Component: FletcherAmmunition, Icon: IconAmmunition, label: `ammunition` },
      ]}
    />
  )
}
