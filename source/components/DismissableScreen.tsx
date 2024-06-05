import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from "react-bootstrap"

import type { ComponentChildren } from "preact"
import type { OffcanvasPlacement } from "react-bootstrap/Offcanvas"

export function DismissableScreen({
	children,
	hideOverflow = false,
	isShowing,
	onClose,
	placement = "end",
	title,
}: {
	children: ComponentChildren
	hideOverflow?: boolean
	isShowing: boolean
	onClose: () => void
	placement?: OffcanvasPlacement
	title: string
}) {
	return (
		<Offcanvas className="pe-3" onHide={onClose} placement={placement} show={isShowing}>
			<OffcanvasHeader closeButton>
				<OffcanvasTitle>
					<span>{title}</span>
				</OffcanvasTitle>
			</OffcanvasHeader>

			<OffcanvasBody className={hideOverflow ? "d-flex overflow-hidden" : "overflow-auto"}>
				{children}
			</OffcanvasBody>
		</Offcanvas>
	)
}
