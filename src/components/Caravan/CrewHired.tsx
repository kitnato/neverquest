import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { CREW, CREW_ICON } from "@neverquest/data/caravan";
import { crew } from "@neverquest/state/caravan";
import { type CrewMember, CrewStatus } from "@neverquest/types/enums";

export function CrewHired({ setActive, type }: { setActive: () => void; type: CrewMember }) {
  const { hireStatus, monologueProgress } = useRecoilValue(crew(type));

  if (hireStatus !== CrewStatus.Hired) {
    return null;
  }

  const { interaction, monologues, name } = CREW[type];

  return (
    <IconDisplay
      contents={
        <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
          <span>{`"${monologues[monologueProgress]}"`}</span>

          <Button onClick={setActive} variant="outline">
            {interaction}
          </Button>
        </div>
      }
      Icon={CREW_ICON}
      tooltip={name}
    />
  );
}
