import Stack from "react-bootstrap/Stack";

import AttributesList from "@neverquest/components/Attributes/AttributesList";
import CharacterLevel from "@neverquest/components/Character/CharacterLevel";
import EssenceAbsorbed from "@neverquest/components/Character/EssenceAbsorbed";

export default function () {
  return (
    <Stack gap={5}>
      <Stack className="position-sticky" direction="horizontal" gap={3}>
        <CharacterLevel />

        <EssenceAbsorbed />
      </Stack>

      <AttributesList />
    </Stack>
  );
}
