import type { ComponentChildren } from "preact"

export function CenterScreen({
	children,
	className,
}: {
	children: ComponentChildren
	className?: string
}) {
	return (
		<span className={`position-absolute top-50 start-50 translate-middle${className ?? ""}`}>
			{children}
		</span>
	)
}
