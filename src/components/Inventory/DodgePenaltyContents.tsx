import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";

export function DodgePenaltyContents({ staminaCost }: { staminaCost: number }) {
  return (
    <span>
      {staminaCost === Infinity ? (
        <>Cannot dodge.</>
      ) : staminaCost === 0 ? (
        <>None.</>
      ) : (
        <>
          {staminaCost} <IconImage Icon={IconStamina} size="tiny" /> stamina
        </>
      )}
      ;
    </span>
  );
}