import { Fragment } from "preact"

import { IconImage } from "@neverquest/components/IconImage"

import type { Description } from "@neverquest/types/ui"

export function DescriptionDisplay({ description, descriptionIcons, isItalic }: Description) {
	return (
		<div>
			{description.split("#").map((part, index) => {
				const descriptionIcon = descriptionIcons?.[index]

				return (
					<Fragment key={index}>
						<span className={isItalic ? "fst-italic" : undefined}>
							{part}
						</span>

						{descriptionIcon !== undefined && <IconImage className="small" Icon={descriptionIcon} />}
					</Fragment>
				)
			})}
		</div>
	)
}
