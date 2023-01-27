import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { CharacterLevel } from "@neverquest/components/Character/CharacterLevel";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { isLevelStarted } from "@neverquest/state/encounter";

export function Attributes() {
  const isLevelStartedValue = useRecoilValue(isLevelStarted);

  return (
    <Stack gap={5}>
      <Stack className="position-sticky" direction="horizontal" gap={3}>
        <CharacterLevel />

        <EssenceAbsorbed />

        {isLevelStartedValue && <span>Cannot increase attributes while monsters are lurking!</span>}
      </Stack>

      <AttributesList />
    </Stack>
  );
}
