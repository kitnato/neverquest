import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CREW } from "@neverquest/data/caravan";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { hireStatus } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { essence } from "@neverquest/state/resources";
import type { Crew } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function CrewHirable({ type }: { type: Crew }) {
  const essenceValue = useRecoilValue(essence);
  const [{ status: hireStatusValue }, setHireStatus] = useRecoilState(hireStatus(type));
  const setIsShowingGearClass = useSetRecoilState(isShowing("gearClass"));

  const transactEssence = useTransactEssence();

  const { description, Icon, price, requiredStage } = CREW[type];
  const isAffordable = price <= essenceValue;
  const name = capitalizeAll(type);

  const handleHire = () => {
    setHireStatus({ status: "hired" });
    transactEssence(-price);

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
          <IconDisplay contents={price} Icon={IconEssence} tooltip="Price" />

          <OverlayTrigger
            overlay={<Tooltip>Insufficient essence!</Tooltip>}
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
