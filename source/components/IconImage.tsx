import { OverlayTrigger, Tooltip } from "react-bootstrap"

import { POPOVER_TRIGGER } from "@neverquest/data/general"

import type { IconImageProperties } from "@neverquest/types/general"

export function IconImage({
	className,
	Icon,
	isFlipped = false,
	isMirrored = false,
	overlayPlacement,
	tooltip,
}: IconImageProperties) {
	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>{tooltip}</span>
				</Tooltip>
			)}
			placement={overlayPlacement}
			trigger={tooltip === undefined ? [] : POPOVER_TRIGGER}
		>
			<div className="align-bottom d-inline-flex">
				<Icon
					className={`icon-image${className === undefined ? "" : ` ${className}`}`}
					style={{
						transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})`,
					}}
				/>
			</div>
		</OverlayTrigger>
	)
}
