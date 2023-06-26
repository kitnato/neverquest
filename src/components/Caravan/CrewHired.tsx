import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { ReactComponent as IconCrewMember } from "@neverquest/icons/crew-member.svg";
import { crew } from "@neverquest/state/caravan";
import type { CrewMember } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHired({ setActive, type }: { setActive: () => void; type: CrewMember }) {
  const { hireStatus, monologueProgress } = useRecoilValue(crew(type));

  if (hireStatus !== "hired") {
    return null;
  }

  const { interaction, monologues } = CREW[type];

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents={capitalizeAll(type)}
        description={`"${monologues[monologueProgress]}"`}
        Icon={IconCrewMember}
        tooltip="Caravan crew"
      />

      <Button onClick={setActive} variant="outline-dark">
        {interaction}
      </Button>
    </div>
  );
}
