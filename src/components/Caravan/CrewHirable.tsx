import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { CREW } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { hireStatus } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { coins } from "@neverquest/state/resources";
import type { Crew } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHirable({ type }: { type: Crew }) {
  const coinsValue = useRecoilValue(coins);
  const [{ status: hireStatusValue }, setHireStatus] = useRecoilState(hireStatus(type));
  const setIsShowingGearClass = useSetRecoilState(isShowing("gearClass"));

  const transactResources = useTransactResources();

  const { coinPrice, description, Icon, requiredStage } = CREW[type];
  const isAffordable = coinPrice <= coinsValue;
  const name = capitalizeAll(type);

  const handleHire = () => {
    setHireStatus({ status: "hired" });
    transactResources({ coinsDifference: -coinPrice });

    if (type === "blacksmith") {
      setIsShowingGearClass(true);
    }
  };

  if (hireStatusValue === "hired") {
    return null;
  }

  if (hireStatusValue === "hirable") {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents={name} description={description} Icon={Icon} tooltip="Caravan crew" />

        <Stack direction="horizontal" gap={3}>
          <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

          <OverlayTrigger
            overlay={<Tooltip>Not enough coins!</Tooltip>}
            trigger={isAffordable ? [] : ["hover", "focus"]}
          >
            <span>
              <Button disabled={!isAffordable} onClick={handleHire} variant="outline-dark">
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
      contents={LABEL_UNKNOWN}
      description={`Unlocks at stage ${requiredStage}.`}
      Icon={IconUnknown}
      tooltip="Caravan crew"
    />
  );
}
