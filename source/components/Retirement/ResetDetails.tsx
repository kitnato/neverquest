import { ListGroup, ListGroupItem, Stack } from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconAttributes from "@neverquest/icons/attributes.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconMasteries from "@neverquest/icons/masteries.svg?react"
import IconMercenary from "@neverquest/icons/mercenary.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import IconSkills from "@neverquest/icons/skills.svg?react"
import IconStage from "@neverquest/icons/stage.svg?react"

export function ResetDetails() {
  return (
    <Stack gap={3}>
      <h6>Reset</h6>

      <ListGroup>
        <ListGroupItem>
          <IconDisplay Icon={IconStage} iconProps={{ className: `small` }}>
            <span>Stage</span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconPowerLevel} iconProps={{ className: `small` }}>
            <span>Power level</span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconEssence} iconProps={{ className: `small` }}>
            <span>Essence</span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconAttributes} iconProps={{ className: `small` }}>
            <span>Attributes</span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconSkills} iconProps={{ className: `small` }}>
            <span>
              Skills&nbsp;
              <span className="small text-secondary">
                acquired from the&nbsp;
                <IconImage className="small" Icon={IconMercenary} />
                &nbsp;Mercenary
              </span>
            </span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconMasteries} iconProps={{ className: `small` }}>
            <span>Masteries</span>
          </IconDisplay>
        </ListGroupItem>

        <ListGroupItem>
          <IconDisplay Icon={IconGear} iconProps={{ className: `small` }}>
            <span>Gear</span>
          </IconDisplay>
        </ListGroupItem>
      </ListGroup>
    </Stack>
  )
}
