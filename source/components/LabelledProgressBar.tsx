import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap"

import type { Attachment, BootstrapColorVariant } from "@neverquest/types/general"
import type { ComponentChildren } from "preact"
import type { ReactNode } from "preact/compat"

export function LabelledProgressBar({
	attachment,
	children,
	disableTransitions = false,
	isAnimated,
	isSmall = false,
	sibling,
	value,
	variant = "dark",
}: {
	attachment?: Attachment
	children: ComponentChildren
	disableTransitions?: boolean
	isAnimated?: boolean
	isSmall?: boolean
	sibling?: ReactNode
	value: number
	variant?: BootstrapColorVariant
}) {
	const appearance = isAnimated
		? {
			animated: true,
			striped: true,
		}
		: {}

	return (
		<div
			className={`progress-labelled w-100${isSmall ? "" : " position-relative"}${disableTransitions ? " transitions-none" : ""}`}
		>
			{isSmall
				? (
					<OverlayTrigger overlay={<Tooltip><>{children}</></Tooltip>} placement="bottom">
						<ProgressBar className={`small${attachment ? ` attached-${attachment}` : ""}`}>
							<ProgressBar {...appearance} now={value} variant={variant} />
						</ProgressBar>
					</OverlayTrigger>
				)
				: (
					<>
						<ProgressBar className={attachment ? `attached-${attachment}` : undefined}>
							<ProgressBar {...appearance} now={value} variant={variant} />

							<>{sibling}</>
						</ProgressBar>

						<div className="position-absolute small text-light text-shaded top-50 start-50 translate-middle">
							{children}
						</div>
					</>
				)}
		</div>
	)
}
