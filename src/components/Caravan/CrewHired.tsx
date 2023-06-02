import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { ReactComponent as IconCrewMember } from "@neverquest/icons/crew-member.svg";
import { crew } from "@neverquest/state/caravan";
import { type CrewMember, CrewStatus } from "@neverquest/types/enums";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

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

          <Button onClick={setActive} variant="outline-dark">
            {interaction}
          </Button>
        </div>
      }
      Icon={IconCrewMember}
      tooltip={name}
    />
  );
}
