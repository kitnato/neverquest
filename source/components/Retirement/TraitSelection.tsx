import { FormCheck, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay"
import { LABEL_NONE } from "@neverquest/data/general"
import { TRAITS } from "@neverquest/data/traits"
import { acquiredSkills } from "@neverquest/state/skills"
import { acquiredTraits, selectedTrait } from "@neverquest/state/traits"
import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions"

const FORM_NAME = `trait-selection`

export function TraitSelection() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills)
  const acquiredTraitsValue = useRecoilValue(acquiredTraits)
  const [selectedTraitValue, setSelectedTrait] = useRecoilState(selectedTrait)
  const resetSelectedTrait = useResetRecoilState(selectedTrait)

  return (
    <Stack gap={3}>
      <h6>Trait selection</h6>

      {Object.values(acquiredTraitsValue).every(Boolean) ? (
        <span className="fst-italic">All traits acquired.</span>
      ) : (
        <Stack gap={3}>
          <FormCheck
            checked={selectedTraitValue === undefined}
            id="noTrait"
            label={<span className="fst-italic">{LABEL_NONE}</span>}
            name={FORM_NAME}
            onChange={resetSelectedTrait}
            type="radio"
          />

          {TRAIT_TYPES.map((trait) => {
            const { requiredSkill } = TRAITS[trait]

            if (!acquiredTraitsValue[trait]) {
              return (
                <FormCheck
                  checked={selectedTraitValue === trait}
                  disabled={requiredSkill !== undefined && !acquiredSkillsValue[requiredSkill]}
                  id={trait}
                  key={trait}
                  label={<TraitDisplay key={trait} trait={trait} />}
                  name={FORM_NAME}
                  onChange={({ target: { value } }) => {
                    setSelectedTrait(value as Trait)
                  }}
                  type="radio"
                  value={trait}
                />
              )
            }
          })}
        </Stack>
      )}
    </Stack>
  )
}
