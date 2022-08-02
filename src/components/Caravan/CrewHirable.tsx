import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import Coins from "@neverquest/components/Resource/Coins";
import icon from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { coins, resourcesBalance } from "@neverquest/state/resources";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";
import { CREW_MEMBERS } from "@neverquest/utilities/constants-caravan";

export default function CrewHirable({ type }: { type: CrewType }) {
  const [{ hireStatus }, setCrewMember] = useRecoilState(crew(type));
  const coinsValue = useRecoilValue(coins);
  const balanceResources = useSetRecoilState(resourcesBalance);

  if (hireStatus !== CrewStatus.Hirable) {
    return null;
  }

  const { description, name, price } = CREW_MEMBERS[type];
  const isAffordable = price <= coinsValue;

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={icon} tooltip={name} />

        <span>{description}</span>
      </Stack>

      <Stack direction="horizontal" gap={3}>
        <Coins tooltip="Price (coins)" value={price} />

        <OverlayTrigger
          overlay={<Tooltip>{!isAffordable && <>Not enough coins!</>}</Tooltip>}
          placement="top"
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span className="d-inline-block">
            <Button
              disabled={!isAffordable}
              onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                currentTarget.blur();

                setCrewMember((current) => ({
                  ...current,
                  hireStatus: CrewStatus.Hired,
                }));
                balanceResources({ coinsDifference: -price });
              }}
              variant={UIVariant.Outline}
            >
              Hire
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
