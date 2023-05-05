import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CREW } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconCrewMember } from "@neverquest/icons/crew-member.svg";
import { crew } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { coins } from "@neverquest/state/resources";
import { CrewMember, CrewStatus, ShowingType } from "@neverquest/types/enums";

export function CrewHirable({ type }: { type: CrewMember }) {
  const coinsValue = useRecoilValue(coins);
  const [{ hireStatus }, setCrewMember] = useRecoilState(crew(type));
  const setIsGearDetails = useSetRecoilState(isShowing(ShowingType.GearDetails));

  const transactResources = useTransactResources();

  if (hireStatus !== CrewStatus.Hirable) {
    return null;
  }

  const { coinPrice, description, name } = CREW[type];
  const isAffordable = coinPrice <= coinsValue;

  const handleHire = () => {
    setCrewMember((current) => ({
      ...current,
      hireStatus: CrewStatus.Hired,
    }));
    transactResources({ coinsDifference: -coinPrice });

    if (type === CrewMember.Blacksmith) {
      setIsGearDetails(true);
    }
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay contents={name} description={description} Icon={IconCrewMember} tooltip={name} />

      <Stack direction="horizontal" gap={3}>
        <Coins tooltip="Price (coins)" value={coinPrice} />

        <OverlayTrigger
          overlay={<Tooltip>Not enough coins!</Tooltip>}
          placement="top"
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span className="d-inline-block">
            <Button disabled={!isAffordable} onClick={handleHire} variant="outline-dark">
              Hire
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
