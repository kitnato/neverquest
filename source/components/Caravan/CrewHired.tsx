import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { hireStatus } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import type { Crew } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHired({ crew, setActive }: { crew: Crew; setActive: () => void }) {
  const hireStatusValue = useRecoilValue(hireStatus(crew));
  const stageValue = useRecoilValue(stage);

  if (hireStatusValue === "hired") {
    const { Icon, interaction, monologues } = CREW[crew];
    const monologue =
      monologues[stageValue] ??
      (() => {
        for (let index = stageValue; index > 0; index--) {
          if (monologues[index] !== undefined) {
            return monologues[index];
          }
        }

        return monologues[1];
      })() ??
      "...";

    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay description={`"${monologue}"`} Icon={Icon} tooltip="Caravan crew">
          {capitalizeAll(crew)}
        </IconDisplay>

        <Button onClick={setActive} variant="outline-dark">
          {interaction}
        </Button>
      </div>
    );
  }
}
