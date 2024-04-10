import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay"
import { LABEL_NONE } from "@neverquest/data/general"
import IconGenerations from "@neverquest/icons/generations.svg?react"
import { generations } from "@neverquest/state/encounter"
import { acquiredTraits } from "@neverquest/state/traits"
import { TRAIT_TYPES } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"

export function Traits() {
	const acquiredTraitsValue = useRecoilValue(acquiredTraits)
	const generationsValue = useRecoilValue(generations)

	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Generation</h6>

				<IconDisplay Icon={IconGenerations} tooltip="Current generation">
					<span>
						{formatNumber({ value: generationsValue })}
					</span>
				</IconDisplay>
			</Stack>

			<Stack gap={3}>
				<h6>Acquired traits</h6>

				{Object.values(acquiredTraitsValue).every(hasAcquiredTrait => !hasAcquiredTrait)
					? (
						<span className="fst-italic">{LABEL_NONE}</span>
					)
					: (
						TRAIT_TYPES.map(trait =>
							acquiredTraitsValue[trait] ? <TraitDisplay key={trait} trait={trait} /> : undefined,
						)
					)}
			</Stack>
		</Stack>
	)
}
