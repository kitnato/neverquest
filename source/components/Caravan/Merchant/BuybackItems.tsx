import {
  Accordion,
  AccordionButton,
  AccordionCollapse,
  AccordionItem,
  Stack,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { PurchasableItems } from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { ACCORDION_EVENT_KEY } from "@neverquest/data/general";
import { merchantInventory } from "@neverquest/state/caravan";
import { expandedBuyback } from "@neverquest/state/settings";

export function BuybackItems() {
  const [expandedBuybackValue, setExpandBuyback] = useRecoilState(expandedBuyback);
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const returnedItems = merchantInventoryValue.filter(({ isReturned }) => isReturned);

  if (returnedItems.length > 0) {
    return (
      <Accordion
        activeKey={expandedBuybackValue ? ACCORDION_EVENT_KEY : undefined}
        onClick={() => {
          setExpandBuyback((isExpanded) => !isExpanded);
        }}
      >
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
