import type { Showing } from "@neverquest/types/unions"
import type { ComponentProps, FunctionComponent } from "preact"
import type { Placement } from "react-bootstrap/esm/types"

export type Animation =
	| "bounceIn"
	| "fadeOutUp"
	| "flipInX"
	| "headShake"
	| "heartBeat"
	| "pulse"
	| "zoomIn"
	| "zoomInRight"
	| "zoomOut"

export type AnimationSpeed = "fast" | "faster" | "slow" | "slower"

export type Attachment = "above" | "below"

export type BootstrapColorVariant = "dark" | "outline-dark" | "secondary"

export type Comparison =
	| false
	| {
		showing: Showing
		subtrahend: number
	}

export type DeltaDisplay = {
	color: "text-danger" | "text-secondary" | "text-success"
	value: number | string
}

export type DeltaReserve = {
	contents?: DeltaDisplay | DeltaDisplay[]
	value: number
}

export type Description = {
	description: string
	descriptionIcons?: [SVGIcon, ...SVGIcon[]]
	isItalic?: boolean
}

export type IconImageProperties = {
	className?: string
	Icon: SVGIcon
	isFlipped?: boolean
	isMirrored?: boolean
	overlayPlacement?: Placement
	tooltip?: string
}

export type IconImageDOMProperties = Omit<IconImageProperties, "Icon">

export type SVGIcon = FunctionComponent<
	ComponentProps<"svg"> & { title?: string }
>

type TabData<Label> = {
	Component: FunctionComponent
	Icon: SVGIcon
	label: Label
}

export type TabsData<Label> = [TabData<Label>, ...TabData<Label>[]]
