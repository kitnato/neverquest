import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"

import { IconImage } from "@neverquest/components/IconImage"
import { repository } from "@neverquest/configuration"
import IconOctopus from "@neverquest/icons/octopus.svg?react"

export function Repository() {
  return (
    <OverlayTrigger overlay={<Tooltip>Source code</Tooltip>} placement="bottom">
      <Button href={repository.url} variant="outline-light">
        <IconImage className="small" Icon={IconOctopus} />
      </Button>
    </OverlayTrigger>
  )
}
