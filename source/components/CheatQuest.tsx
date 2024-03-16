import { useLayoutEffect } from "react"

import { useCheatQuest } from "@neverquest/hooks/actions/useCheatQuest"
import type { Skill } from "@neverquest/types/unions"

declare const window: Window & {
  cheatQuest: (cheat: string, value?: Skill | number) => void;
}

export function CheatQuest() {
  const cheatQuest = useCheatQuest()

  useLayoutEffect(() => {
    window.cheatQuest = (cheat, value) => {
      cheatQuest({ cheat, value })
    }
  }, [cheatQuest])

  return <></>
}
