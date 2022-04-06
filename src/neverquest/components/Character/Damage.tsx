import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damage } from "neverquest/state/attributes";
import { weapon } from "neverquest/state/equipment";
import { show } from "neverquest/state/global";
import { totalDamage } from "neverquest/state/stats";
import { getComputedStat } from "neverquest/utilities/helpers";

export default function Damage() {
  const damageValue = useRecoilValue(damage);
  const { totalDamageSummary } = useRecoilValue(show);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total damage" />

      {totalDamageSummary ? (
        <OverlayTrigger
          overlay={
            <Tooltip>
              {
                <>
                  <span>{`Weapon: ${weaponValue.damage}`}</span>

                  <br />

                  <span>{`${damageValue.name} attribute: ${getComputedStat(damageValue)}`}</span>
                </>
              }
            </Tooltip>
          }
          placement="top"
        >
          <span>{totalDamageValue}</span>
        </OverlayTrigger>
      ) : (
        <span>{totalDamageValue}</span>
      )}
    </Stack>
  );
}
