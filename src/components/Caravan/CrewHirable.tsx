import { useAtomValue, useSetAtom } from "jotai";
import { MouseEvent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import Coins from "@neverquest/components/Resource/Coins";
import icon from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { coins, resourcesBalance } from "@neverquest/state/resources";
import { CrewHireStatus, CrewType } from "@neverquest/types/core";
import { UIVariant } from "@neverquest/types/ui";
import { CREW_MEMBERS } from "@neverquest/utilities/constants-caravan";

export default function CrewHirable({ type }: { type: CrewType }) {
  const coinsValue = useAtomValue(coins);
  const setCrew = useSetAtom(crew);
  const balanceResources = useSetAtom(resourcesBalance);

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

                setCrew((current) => ({
                  ...current,
                  [type]: {
                    ...current[type],
                    hireStatus: CrewHireStatus.Hired,
                  },
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
