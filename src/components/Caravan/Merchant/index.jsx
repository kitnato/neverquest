import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import BuyItems from "components/Caravan/Merchant/BuyItems";
import SellScrap from "components/Caravan/Merchant/SellScrap";
import SellItems from "components/Caravan/Merchant/SellItems";
import { merchantInventory } from "state/caravan";
import { level } from "state/global";
import { generateWeapon } from "utilities/helpers";

export default function Merchant() {
  const levelValue = useRecoilValue(level);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  // TODO
  useEffect(() => {
    console.log("generate");
    setMerchantInventory([
      {
        cost: levelValue * 2,
        item: generateWeapon({ level: levelValue, type: "light" }),
        key: uuidv4(),
        type: "weapon",
      },
    ]);
  });

  return (
    <Stack gap={4}>
      <SellScrap />

      <SellItems />

      <BuyItems />
    </Stack>
  );
}
