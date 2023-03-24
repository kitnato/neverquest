import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { CREW, CREW_ICON } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { crew } from "@neverquest/state/caravan";
import { coins } from "@neverquest/state/resources";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export function CrewHirable({ type }: { type: CrewType }) {
  const coinsValue = useRecoilValue(coins);
  const [{ hireStatus }, setCrewMember] = useRecoilState(crew(type));

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
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay contents={name} description={description} Icon={CREW_ICON} tooltip={name} />

      <Stack direction="horizontal" gap={3}>
        <Coins tooltip="Price (coins)" value={coinPrice} />

        <OverlayTrigger
          overlay={<Tooltip>{!isAffordable && <>Not enough coins!</>}</Tooltip>}
          placement="top"
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span className="d-inline-block">
            <Button disabled={!isAffordable} onClick={handleHire} variant={UIVariant.Outline}>
              Hire
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
