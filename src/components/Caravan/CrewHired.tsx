import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { crew } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import type { CrewMember } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHired({ setActive, type }: { setActive: () => void; type: CrewMember }) {
  const hireStatus = useRecoilValue(crew(type));
  const stageValue = useRecoilValue(stage);

  if (hireStatus !== "hired") {
    return null;
  }

  const { Icon, interaction, monologues } = CREW[type];
  const monologue =
    monologues[stageValue] ??
    (() => {
      for (let i = stageValue; i > 0; i--) {
        if (monologues[i] !== undefined) {
          return monologues[i];
        }
      }

      return monologues[1];
    })() ??
    "...";

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents={capitalizeAll(type)}
        description={`"${monologue}"`}
        Icon={Icon}
        tooltip="Caravan crew"
      />

      <Button onClick={setActive} variant="outline-dark">
        {interaction}
      </Button>
    </div>
  );
}
