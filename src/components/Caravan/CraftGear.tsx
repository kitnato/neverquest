import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { essence } from "@neverquest/state/resources";

export function CraftGear({ onCraft, price }: { onCraft: () => void; price: number }) {
  const essenceValue = useRecoilValue(essence);

  const transactEssence = useTransactEssence();

  const isAffordable = price <= essenceValue;

  const handleCraft = () => {
    onCraft();
    transactEssence(-price);
  };

  return (
    <Stack className="mx-auto" direction="horizontal" gap={5}>
      <IconDisplay contents={essenceValue} Icon={IconEssence} tooltip="Cost" />

      <OverlayTrigger
        overlay={<Tooltip>Insufficient essence!</Tooltip>}
        trigger={isAffordable ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            className="w-100"
            disabled={!isAffordable}
            onClick={handleCraft}
            variant="outline-dark"
          >
            Craft
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
