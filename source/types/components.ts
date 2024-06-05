import type { Showing } from "@neverquest/types/unions"
import type { ComponentProps, FunctionComponent } from "preact"
import type { Placement } from "react-bootstrap/esm/types"

export type Comparison =
	| false
	| {
		showing: Showing
		subtrahend: number
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
