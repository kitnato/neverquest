import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  LABEL_UNKNOWN,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useHireCrewMember } from "@neverquest/hooks/actions/useHireCrewMember";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { isHired } from "@neverquest/state/caravan";
import { stageMaximum } from "@neverquest/state/encounter";
import { essence } from "@neverquest/state/resources";
import type { CrewMember } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function HirableCrewMember({ crewMember }: { crewMember: CrewMember }) {
  const isHiredValue = useRecoilValue(isHired(crewMember));
  const essenceValue = useRecoilValue(essence);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const hireCrewMember = useHireCrewMember();

  const { description, Icon, price, requiredStage } = CREW[crewMember];
  const isAffordable = price <= essenceValue;
  const name = capitalizeAll(crewMember);

  if (!isHiredValue) {
    if (stageMaximumValue >= requiredStage) {
      return (
        <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
          <IconDisplay
            description={<span>{description}</span>}
            Icon={Icon}
            tooltip="Caravan crew member"
          >
            <span>{name}</span>
          </IconDisplay>

          <Stack className="ms-2" direction="horizontal" gap={3}>
            <IconDisplay Icon={IconEssence} tooltip="Price">
              {formatNumber({ value: price })}
            </IconDisplay>

            <OverlayTrigger
              overlay={
                <Tooltip>
                  <span>{LABEL_NO_ESSENCE}</span>
                </Tooltip>
              }
              trigger={isAffordable ? [] : POPOVER_TRIGGER}
            >
              <div>
                <Button
                  disabled={!isAffordable}
                  onClick={() => {
                    hireCrewMember({ crewMember, price });
                  }}
                  variant="outline-dark"
                >
                  Hire
                </Button>
              </div>
            </OverlayTrigger>
          </Stack>
        </div>
      );
    }

    return (
      <IconDisplay
        description={<span>{`Found on stage ${requiredStage}.`}</span>}
        Icon={IconUnknown}
        tooltip="Caravan crew member"
      >
        <span>{LABEL_UNKNOWN}</span>
      </IconDisplay>
    );
  }
}
