import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { CREW } from "@neverquest/data/caravan";
import { ReactComponent as Icon } from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export function CrewHired({ setActive, type }: { setActive: () => void; type: CrewType }) {
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

          <Button
            onClick={({ currentTarget }) => {
              currentTarget.blur();

              setActive();
            }}
            variant={UIVariant.Outline}
          >
            {interaction}
          </Button>
        </div>
      }
      Icon={Icon}
      tooltip={name}
    />
  );
}
