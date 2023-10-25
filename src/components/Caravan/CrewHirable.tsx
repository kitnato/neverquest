import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { hireStatus } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { essence } from "@neverquest/state/resources";
import type { Crew } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function CrewHirable({ crew }: { crew: Crew }) {
  const essenceValue = useRecoilValue(essence);
  const [{ status: hireStatusValue }, setHireStatus] = useRecoilState(hireStatus(crew));
  const setIsShowingGearClass = useSetRecoilState(isShowing("gearClass"));

  const transactEssence = useTransactEssence();

  const { description, Icon, price, requiredStage } = CREW[crew];
  const isAffordable = price <= essenceValue;
  const name = capitalizeAll(crew);

  if (hireStatusValue === "hired") {
    return null;
  }

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
            trigger={isAffordable ? [] : ["hover", "focus"]}
          >
            <span>
              <Button
                disabled={!isAffordable}
                onClick={() => {
                  setHireStatus({ status: "hired" });
                  transactEssence(-price);

                  if (crew === "blacksmith") {
                    setIsShowingGearClass(true);
                  }
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
