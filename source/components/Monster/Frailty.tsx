import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { RELICS } from "@neverquest/data/items"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconFrailty from "@neverquest/icons/frailty.svg?react"
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react"
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react"
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { frailty } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Frailty() {
  const frailtyValue = useRecoilValue(frailty)
  const ownedItemFamiliar = useRecoilValue(ownedItem(`familiar`))

  const Icon = ownedItemFamiliar === undefined ? IconHatchingProgress : RELICS.familiar.Icon
  const formattedValue = formatNumber({ format: `percentage`, value: frailtyValue })

  useDeltaText({
    delta: `frailty`,
    state: frailty,
  })

  if (frailtyValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: `flipInX` })}
        Icon={IconFrailty}
        tooltip="Frailty"
      >
        <Stack gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DescriptionDisplay
                    description={`A # presence is weakening # and # by ${formattedValue}.`}
                    descriptionIcons={[Icon, IconMonsterHealth, IconMonsterDamage]}
                  />
                </PopoverBody>
              </Popover>
            }
            placement="right"
          >
            <span className="fitted">-{formattedValue}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="frailty" />
        </Stack>
      </IconDisplay>
    )
  }
}
