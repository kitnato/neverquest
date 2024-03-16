import { Fragment } from "react"

import { IconImage } from "@neverquest/components/IconImage"
import type { Description } from "@neverquest/types/ui"

export function DescriptionDisplay({ description, descriptionIcons }: Description) {
  return (
    <div>
      {description.split(`#`).map((part, index) => {
        if (descriptionIcons?.[index] === undefined) {
          return <span key={index}>{part}</span>
        }

        const descriptionIcon = descriptionIcons[index]

        if (descriptionIcon !== undefined) {
          return (
            <Fragment key={index}>
              <span>{part}</span>

              {descriptionIcons[index] !== undefined && (
                <IconImage className="small" Icon={descriptionIcon} />
              )}
            </Fragment>
          )
        }
      })}
    </div>
  )
}
