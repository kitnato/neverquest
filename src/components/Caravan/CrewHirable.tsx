import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { CREW } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { crew } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { coins } from "@neverquest/state/resources";
import type { CrewMember } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHirable({ type }: { type: CrewMember }) {
  const coinsValue = useRecoilValue(coins);
  const [hireStatus, setHireStatus] = useRecoilState(crew(type));
  const setIsShowingGearClass = useSetRecoilState(isShowing("gearClass"));

  const transactResources = useTransactResources();

  const { coinPrice, description, Icon, requiredStage } = CREW[type];
  const isAffordable = coinPrice <= coinsValue;
  const name = capitalizeAll(type);

  const handleHire = () => {
    setHireStatus("hired");
    transactResources({ coinsDifference: -coinPrice });

    if (type === "blacksmith") {
      setIsShowingGearClass(true);
    }
  };

  if (hireStatus === "hired") {
    return null;
  }

  if (hireStatus === "hirable") {
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
