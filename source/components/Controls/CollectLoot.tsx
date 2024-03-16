import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot"
import IconLoot from "@neverquest/icons/loot.svg?react"
import { hasFlatlined, isAttacking, isLooting } from "@neverquest/state/character"
import { isStageCompleted, location, progressMaximum } from "@neverquest/state/encounter"
import { isLootAvailable } from "@neverquest/state/resources"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function CollectLoot() {
  const isAttackingValue = useRecoilValue(isAttacking)
  const hasFlatlinedValue = useRecoilValue(hasFlatlined)
  const isLootAvailableValue = useRecoilValue(isLootAvailable)
  const isLootingValue = useRecoilValue(isLooting)
  const isStageCompletedValue = useRecoilValue(isStageCompleted)
  const locationValue = useRecoilValue(location)
  const progressMaximumValue = useRecoilValue(progressMaximum)

  const collectLoot = useCollectLoot()

  if (
    isLootAvailableValue &&
    (progressMaximumValue === Number.POSITIVE_INFINITY || isStageCompletedValue) &&
    locationValue === `wilderness`
  ) {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Collect loot</span>
          </Tooltip>
        }
      >
        <div className={getAnimationClass({ animation: `bounceIn` })}>
          <Button
            className={
              isStageCompletedValue
                ? getAnimationClass({ animation: `pulse`, isInfinite: true })
                : undefined
            }
            disabled={hasFlatlinedValue || isAttackingValue || isLootingValue}
            onClick={collectLoot}
            variant="outline-dark"
          >
            <IconImage Icon={IconLoot} />
          </Button>
        </div>
      </OverlayTrigger>
    )
  }
}
