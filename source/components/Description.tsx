import { Fragment } from "react";

import { IconImage } from "@neverquest/components/IconImage";
import type { SVGIcon } from "@neverquest/types/components";

export function Description({
  description,
  descriptionIcons,
}: {
  description: string;
  descriptionIcons?: SVGIcon[];
}) {
  return (
    <div>
      {description.split("#").map((part, index) => {
        if (descriptionIcons?.[index] === undefined) {
          return <span key={index}>{part}</span>;
        }

        const descriptionIcon = descriptionIcons[index];

        if (descriptionIcon !== undefined) {
          return (
            <Fragment key={index}>
              <span>{part}</span>

              {descriptionIcons[index] !== undefined && (
                <IconImage className="small" Icon={descriptionIcon} />
              )}
            </Fragment>
          );
        }
      })}
    </div>
  );
}
