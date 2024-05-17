import { useRecoilState } from "recoil"

import { CraftMunitions } from "@neverquest/components/Caravan/Fletcher/CraftMunitions"
import { RangedOptions } from "@neverquest/components/Caravan/Fletcher/RangedOptions"
import { IconTabs } from "@neverquest/components/IconTabs"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import { fletcherOptions } from "@neverquest/state/caravan"

import type { FletcherOption } from "@neverquest/types/unions"

export function Fletcher() {
	const [{ activeTab }, setFletcherOptions] = useRecoilState(fletcherOptions)

	return (
		<IconTabs<FletcherOption>
			activeKey={activeTab}
			onSelect={(key) => {
				setFletcherOptions(options => ({ ...options, activeTab: key }))
			}}
			tabs={[
				{ Component: RangedOptions, Icon: IconRanged, label: "ranged" },
				{ Component: CraftMunitions, Icon: IconMunitions, label: "munitions" },
			]}
		/>
	)
}
