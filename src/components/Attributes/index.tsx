import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import AttributesList from "@neverquest/components/Attributes/AttributesList";
import CharacterLevel from "@neverquest/components/Character/CharacterLevel";
import EssenceAbsorbed from "@neverquest/components/Character/EssenceAbsorbed";
import { isMonsterEngaged } from "@neverquest/state/monster";

export default function () {
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);

  return (
    <Stack gap={5}>
      <Stack className="position-sticky" direction="horizontal" gap={3}>
        <CharacterLevel />

        <EssenceAbsorbed />

        {isMonsterEngagedValue && (
          <span>Cannot increase attributes while a monster is engaged!</span>
        )}
      </Stack>

      <AttributesList />
    </Stack>
  );
}
