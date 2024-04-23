import { Stack } from "react-bootstrap"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevelDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { infusionLevel } from "@neverquest/state/items"

import type { Infusable } from "@neverquest/types/unions"

export function InfusionLevel({ infusable }: { infusable: Infusable }) {
	useDeltaText({
		delta: "infusionLevel",
		state: infusionLevel(infusable),
	})

	return (
		<Stack direction="horizontal" gap={1}>
			<InfusionLevelDisplay infusable={infusable} />

			<DeltasDisplay delta="infusionLevel" />
		</Stack>
	)
}
