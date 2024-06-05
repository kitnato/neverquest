import { useEffect, useRef } from "preact/hooks"
import { Card, CardBody, Stack } from "react-bootstrap"
import { useResetRecoilState, useSetRecoilState } from "recoil"

import { Health } from "@neverquest/components/Reserves/Health"
import { Stamina } from "@neverquest/components/Reserves/Stamina"
import { AttackRate } from "@neverquest/components/Status/AttackRate"
import { Name } from "@neverquest/components/Status/Name"
import { Recovery } from "@neverquest/components/Status/Recovery"
import { statusElement } from "@neverquest/state/character"

export function Status() {
	const setStatusElement = useSetRecoilState(statusElement)
	const resetStatusElement = useResetRecoilState(statusElement)

	const elementReference = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const { current } = elementReference

		if (current !== null) {
			setStatusElement(current)
		}

		return resetStatusElement
	}, [resetStatusElement, setStatusElement])

	return (
		<Card ref={elementReference}>
			<CardBody>
				<Stack gap={3}>
					<Name />

					<Health />

					<Stamina />

					<AttackRate />

					<Recovery />
				</Stack>
			</CardBody>
		</Card>
	)
}
