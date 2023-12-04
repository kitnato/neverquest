import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { useHireCrew } from "@neverquest/hooks/actions/useHireCrew";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { hireStatus } from "@neverquest/state/caravan";
import { essence } from "@neverquest/state/resources";
import type { Crew } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function CrewHirable({ crew }: { crew: Crew }) {
  const hireStatusValue = useRecoilValue(hireStatus(crew));
  const essenceValue = useRecoilValue(essence);

  const hireCrew = useHireCrew();

  const { description, Icon, price, requiredStage } = CREW[crew];
  const isAffordable = price <= essenceValue;
  const name = capitalizeAll(crew);

  if (hireStatusValue === "hirable") {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay description={description} Icon={Icon} tooltip="Caravan crew">
          {name}
        </IconDisplay>

        <Stack direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
            trigger={isAffordable ? [] : ["focus", "hover"]}
          >
            <span>
              <Button
                disabled={!isAffordable}
                onClick={() => {
                  hireCrew({ crew, price });
                }}
                variant="outline-dark"
              >
                Hire
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    );
  }

  if (hireStatusValue === "hidden") {
    return (
      <IconDisplay
        description={`Unlocks at stage ${requiredStage}.`}
        Icon={IconUnknown}
        tooltip="Caravan crew"
      >
        {LABEL_UNKNOWN}
      </IconDisplay>
    );
  }
}
