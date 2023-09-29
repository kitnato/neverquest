import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { essence } from "@neverquest/state/resources";
import { LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

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
      <IconDisplay contents={formatValue({ value: price })} Icon={IconEssence} tooltip="Cost" />

      <OverlayTrigger
        overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
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
