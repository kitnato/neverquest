import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OVUM_INFUSION_PRICE } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconOvumInfusion from "@neverquest/icons/ovum-infusion.svg?react";
import { canInfuseMysteriousEgg, inventory, ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function LearnOvumInfusion() {
  const [canInfuseMysteriousEggValue, setCanInfuseMysteriousEgg] =
    useRecoilState(canInfuseMysteriousEgg);
  const essenceValue = useRecoilValue(essence);
  const ownedItemTornManuscript = useRecoilValue(ownedItem("torn manuscript"));
  const setInventory = useSetRecoilState(inventory);

  const transactEssence = useTransactEssence();

  const isAffordable = OVUM_INFUSION_PRICE <= essenceValue;

  if (!canInfuseMysteriousEggValue && ownedItemTornManuscript !== undefined) {
    return (
      <Stack gap={3}>
        <h6>Learn technique</h6>

        <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
          <IconDisplay
            description="Acquire the ancient knowledge of hatching arcane eggs."
            Icon={IconOvumInfusion}
            tooltip="Technique"
          >
            Ovum infusion
          </IconDisplay>

          <Stack className="ms-2" direction="horizontal" gap={3}>
            <IconDisplay Icon={IconEssence} tooltip="Price">
              {formatNumber({ value: OVUM_INFUSION_PRICE })}
            </IconDisplay>

            <OverlayTrigger
              overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
              trigger={isAffordable ? [] : ["focus", "hover"]}
            >
              <div>
                <Button
                  disabled={!isAffordable}
                  onClick={() => {
                    transactEssence(-OVUM_INFUSION_PRICE);

                    setCanInfuseMysteriousEgg(true);
                    setInventory((currentInventory) =>
                      currentInventory.filter(({ ID }) => ID !== ownedItemTornManuscript.ID),
                    );
                  }}
                  variant="outline-dark"
                >
                  Learn
                </Button>
              </div>
            </OverlayTrigger>
          </Stack>
        </div>
      </Stack>
    );
  }
}
