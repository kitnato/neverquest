import {
  Accordion,
  AccordionButton,
  AccordionCollapse,
  AccordionItem,
  Stack,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { PurchasableItems } from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { merchantInventory } from "@neverquest/state/caravan";

const ACCORDION_EVENT_KEY = "0";

export function BuybackItems() {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const returnedItems = merchantInventoryValue.filter(({ isReturned }) => isReturned);

  if (returnedItems.length > 0) {
    return (
      <Accordion defaultActiveKey={ACCORDION_EVENT_KEY}>
        <AccordionItem className="border-0" eventKey={ACCORDION_EVENT_KEY}>
          <AccordionButton className="px-0">
            <h6>Buy back items</h6>
          </AccordionButton>

          <AccordionCollapse eventKey={ACCORDION_EVENT_KEY}>
            <Stack gap={3}>
              <PurchasableItems canEradicate merchantItems={returnedItems} />
            </Stack>
          </AccordionCollapse>
        </AccordionItem>
      </Accordion>
    );
  }
}
