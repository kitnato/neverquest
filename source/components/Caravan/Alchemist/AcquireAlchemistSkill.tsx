import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill"
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general"
import { SKILLS } from "@neverquest/data/skills"
import IconTornManuscript from "@neverquest/icons/torn-manuscript.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { acquiredSkills } from "@neverquest/state/skills"
import { SKILL_TYPES } from "@neverquest/types/unions"

export function AcquireAlchemistSkill() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills)
  const ownedItemTornManuscript = useRecoilValue(ownedItem(`torn manuscript`))

  const availableSkills = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === `alchemist` && !acquiredSkillsValue[skill],
  )

  return (
    <Stack gap={3}>
      <h6>Acquire skill</h6>

      {availableSkills.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (ownedItemTornManuscript === undefined ? (
        <span>
          &quot;Alas, the sage teachings are lost to time. Have you come across any arcane writs
          lately?&quot;
        </span>
      ) : (
        <>
          <IconDisplay Icon={IconTornManuscript} iconProps={{ className: `small` }}>
            <span>
              &quot;Pages from the hermetic almanac! Let&apos;s see if I can still weave miracles
              ...&quot;
            </span>
          </IconDisplay>

          <>
            {availableSkills.map((skill) => (
              <TrainableSkill key={skill} skill={skill} />
            ))}
          </>
        </>
      ))}
    </Stack>
  )
}
