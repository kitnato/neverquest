import { Stack } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { LootDisplay } from "@neverquest/components/Loot/LootDisplay"
import { Looting } from "@neverquest/components/Loot/Looting"
import { useAutoProgressStage } from "@neverquest/hooks/actions/useAutoProgressStage"
import { useDropLoot } from "@neverquest/hooks/actions/useDropLoot"
import { useProgression } from "@neverquest/hooks/actions/useProgression"
import { useTimer } from "@neverquest/hooks/useTimer"
import { isLooting, lootingDuration } from "@neverquest/state/character"

export function Loot() {
  const isLootingValue = useRecoilValue(isLooting)
  const setLootingDuration = useSetRecoilState(lootingDuration)

  const autoProgressStage = useAutoProgressStage()
  const dropLoot = useDropLoot()
  const progression = useProgression()

  useTimer({
    onElapsed: () => {
      dropLoot()
      progression()
      autoProgressStage()
    },
    setDuration: setLootingDuration,
    stop: !isLootingValue,
  })

  return (
    <Stack gap={3}>
      <Looting />

      <LootDisplay />
    </Stack>
  )
}
