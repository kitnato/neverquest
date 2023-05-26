import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CREW } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/data/internal";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconCrewMember } from "@neverquest/icons/crew-member.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { crew } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { coins } from "@neverquest/state/resources";
import { CrewMember, CrewStatus, Showing } from "@neverquest/types/enums";

export function CrewHirable({ type }: { type: CrewMember }) {
  const coinsValue = useRecoilValue(coins);
  const [{ hireStatus }, setCrewMember] = useRecoilState(crew(type));
  const setIsShowingGearClass = useSetRecoilState(isShowing(Showing.GearClass));

  const transactResources = useTransactResources();

  const { coinPrice, description, hirableLevel, name } = CREW[type];
  const isAffordable = coinPrice <= coinsValue;

  const handleHire = () => {
    setCrewMember((current) => ({
      ...current,
      hireStatus: CrewStatus.Hired,
    }));
    transactResources({ coinsDifference: -coinPrice });

    if (type === CrewMember.Blacksmith) {
      setIsShowingGearClass(true);
    }
  };

  if (hireStatus === CrewStatus.Hired) {
    return null;
  }

  if (hireStatus === CrewStatus.Hirable) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          contents={name}
          description={description}
          Icon={IconCrewMember}
          tooltip={name}
        />

        <Stack direction="horizontal" gap={3}>
          <Coins tooltip="Price (coins)" value={coinPrice} />

          <OverlayTrigger
            overlay={<Tooltip>Not enough coins!</Tooltip>}
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

  return (
    <IconDisplay
      contents={LABEL_UNKNOWN}
      description={`Unlocks at Level ${hirableLevel}`}
      Icon={IconUnknown}
      tooltip={LABEL_UNKNOWN}
    />
  );
}
