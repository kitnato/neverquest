import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import Coins from "@neverquest/components/Resource/Coins";
import { CREW_MEMBERS } from "@neverquest/constants/caravan";
import { ReactComponent as Icon } from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { coins } from "@neverquest/state/resources";
import { resourcesBalance } from "@neverquest/state/transactions";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";

export default function ({ type }: { type: CrewType }) {
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
      <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />

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
