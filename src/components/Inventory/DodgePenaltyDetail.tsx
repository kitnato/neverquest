import { ReactComponent as IconStaminaCost } from "@neverquest/icons/stamina-cost.svg";

export function DodgePenaltyDetail({ staminaCost }: { staminaCost: number }) {
  return staminaCost === Infinity ? (
    <>Cannot dodge.</>
  ) : staminaCost === 0 ? (
    <>None</>
  ) : (
    <>
      {staminaCost} <IconStaminaCost className="inlay" /> stamina
    </>
  );
}
