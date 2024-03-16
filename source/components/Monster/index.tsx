import { useEffect, useLayoutEffect, useRef } from "react"
import { Card, CardBody, Stack } from "react-bootstrap"
import { useRecoilState, useResetRecoilState } from "recoil"
import { Ailments } from "@neverquest/components/Monster/Ailments"

import { Distance } from "@neverquest/components/Monster/Distance"
import { Frailty } from "@neverquest/components/Monster/Frailty"
import { MonsterAttackRate } from "@neverquest/components/Monster/MonsterAttackRate"
import { MonsterHealth } from "@neverquest/components/Monster/MonsterHealth"
import { MonsterName } from "@neverquest/components/Monster/MonsterName"
import { MonsterOffense } from "@neverquest/components/Monster/MonsterOffense"
import { Rage } from "@neverquest/components/Monster/Rage"
import { isMonsterNew, monsterElement } from "@neverquest/state/monster"
import { animateElement } from "@neverquest/utilities/helpers"

export function Monster() {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew)
  const [monsterElementValue, setMonsterElement] = useRecoilState(monsterElement)
  const resetMonsterElement = useResetRecoilState(monsterElement)

  const element = useRef(null)

  useLayoutEffect(() => {
    setMonsterElement(element.current)

    return resetMonsterElement
  }, [resetMonsterElement, setMonsterElement])

  useEffect(() => {
    if (isMonsterNewValue && monsterElementValue !== null) {
      animateElement({
        animation: `zoomInRight`,
        element: monsterElementValue,
        onAnimationEnd: () => {
          setMonsterNew(false)
        },
        speed: `faster`,
      })
    }
  }, [isMonsterNewValue, monsterElementValue, setMonsterNew])

  return (
    <Stack gap={3}>
      <Card ref={element}>
        <CardBody>
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterAttackRate />

            <Rage />

            <MonsterOffense />

            <Frailty />
          </Stack>
        </CardBody>
      </Card>

      <Distance />

      <Ailments />
    </Stack>
  )
}
