import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay"
import { LABEL_NONE } from "@neverquest/data/general"
import IconGeneration from "@neverquest/icons/generation.svg?react"
import { generation } from "@neverquest/state/character"
import { earnedTraits } from "@neverquest/state/traits"
import { TRAIT_TYPES } from "@neverquest/types/unions"
import { formatCardinal } from "@neverquest/utilities/formatters"

export function Traits() {
	const earnedTraitsValue = useRecoilValue(earnedTraits)
	const generationValue = useRecoilValue(generation)

	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Generation</h6>

				<IconDisplay Icon={IconGeneration} tooltip="Current generation">
					<span>
						{formatCardinal(generationValue)}
					</span>
				</IconDisplay>
			</Stack>

			<Stack gap={3}>
				<h6>Earned traits</h6>

				{Object.values(earnedTraitsValue).every(hasEarnedTrait => !hasEarnedTrait)
					? <span className="fst-italic">{LABEL_NONE}</span>

					: TRAIT_TYPES.map(trait =>
						earnedTraitsValue[trait] ? <TraitDisplay key={trait} trait={trait} /> : undefined,
					)}
			</Stack>
		</Stack>
	)
}
