import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damage } from "neverquest/state/attributes";
import { weapon } from "neverquest/state/equipment";
import { showTotalDamageSummary } from "neverquest/state/show";
import { totalDamage } from "neverquest/state/stats";
import { getComputedStat } from "neverquest/utilities/helpers";

export default function Damage() {
  const damageValue = useRecoilValue(damage);
  const showTotalDamageSummaryValue = useRecoilValue(showTotalDamageSummary);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total damage" />

      {showTotalDamageSummaryValue ? (
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Damage breakdown</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="text-end">Weapon:</td>

                      <td>{weaponValue.damage}</td>
                    </tr>

                    <tr>
                      <td>{`${damageValue.name} attribute:`}</td>

                      <td>{getComputedStat(damageValue)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
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
