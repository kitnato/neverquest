import { Fragment } from "preact"
import { useEffect } from "preact/hooks"
import { Stack } from "react-bootstrap"
import { useRecoilState, useResetRecoilState } from "recoil"

import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { deltas } from "@neverquest/state/deltas"
import { getAnimationClass } from "@neverquest/utilities/getters"

import type { Delta } from "@neverquest/types/unions"

export function DeltasDisplay({ delta }: { delta: Delta }) {
	const deltasState = deltas(delta)

	const [deltasValue, setDeltas] = useRecoilState(deltasState)
	const resetDeltas = useResetRecoilState(deltasState)

	useEffect(() => resetDeltas, [resetDeltas])

	return (
		<div className="d-flex flex-nowrap text-floating position-relative">
			{deltasValue.map(({ display, ID }) => (
				<div className="position-absolute top-50 start-100 translate-middle-y" key={ID}>
					<Stack
						className={getAnimationClass({
							animation: "fadeOutUp",
							speed: "slower",
						})}
						direction="horizontal"
						gap={1}
						onAnimationEnd={() => {
							setDeltas(currentDeltas =>
								currentDeltas.filter(({ ID: currentDeltaID }) => currentDeltaID !== ID),
							)
						}}
					>
						{display.map(({ color, value }, index) => (
							<Fragment key={value}>
								<strong className={`${color} small text-nowrap`}>
									{value}
								</strong>

								{index < display.length - 1 && <span className="text-dark">{LABEL_SEPARATOR}</span>}
							</Fragment>
						))}
					</Stack>
				</div>
			))}
		</div>
	)
}
