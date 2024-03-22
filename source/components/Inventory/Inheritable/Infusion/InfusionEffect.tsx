import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { INFUSABLES } from "@neverquest/data/items"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { infusionEffect } from "@neverquest/state/items"
import type { Infusable } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"

export function InfusionEffect({ infusable }: { infusable: Infusable }) {
	const infusionEffectState = infusionEffect(infusable)

	const infusionEffectValue = useRecoilValue(infusionEffectState)

	const {
		delta,
		EffectIcon,
		item: {
			effect: { maximum },
		},
		tooltip,
	} = INFUSABLES[infusable]

	useDeltaText({
		delta,
		format: "percentage",
		state: infusionEffectState,
	})

	return (
		<Stack direction="horizontal" gap={1}>
			<IconDisplay Icon={EffectIcon} tooltip={tooltip}>
				<span>
					{formatNumber({
						decimals: infusionEffectValue >= maximum ? 0 : 2,
						format: "percentage",
						value: Math.abs(infusionEffectValue),
					})}
				</span>
			</IconDisplay>

			<DeltasDisplay delta={delta} />
		</Stack>
	)
}
