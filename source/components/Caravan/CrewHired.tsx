import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { hireStatus, monologue } from "@neverquest/state/caravan";
import type { Crew } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CrewHired({ crew, setActive }: { crew: Crew; setActive: () => void }) {
  const hireStatusValue = useRecoilValue(hireStatus(crew));
  const monologueValue = useRecoilValue(monologue(crew));

  if (hireStatusValue === "hired") {
    const { Icon, interaction } = CREW[crew];

    return (
      <div
        className={`${CLASS_FULL_WIDTH_JUSTIFIED} ${getAnimationClass({ animation: "flipInX" })}`}
      >
        <IconDisplay description={`"${monologueValue}"`} Icon={Icon} tooltip="Caravan crew">
          {capitalizeAll(crew)}
        </IconDisplay>

        <Button className="ms-2" onClick={setActive} variant="outline-dark">
          {interaction}
        </Button>
      </div>
    );
  }
}
