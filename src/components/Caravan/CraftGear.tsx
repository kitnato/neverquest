import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CraftGear({ onCraft, price }: { onCraft: () => void; price: number }) {
  const essenceValue = useRecoilValue(essence);

  const transactEssence = useTransactEssence();

  const isAffordable = price <= essenceValue;

  return (
    <Stack className="mx-auto" direction="horizontal" gap={5}>
      <IconDisplay Icon={IconEssence} tooltip="Cost">
        {formatNumber({ value: price })}
      </IconDisplay>

      <OverlayTrigger
        overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
        trigger={isAffordable ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            className="w-100"
            disabled={!isAffordable}
            onClick={() => {
              onCraft();
              transactEssence(-price);
            }}
            variant="outline-dark"
          >
            Craft
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
