import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { damage, damagePerSecond, damageTotal } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";

export function Damage() {
  const damageValue = useRecoilValue(damage);
  const damageTotalValue = useRecoilValue(damageTotal);
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const isShowingDamageDetails = useRecoilValue(isShowing(ShowingType.DamageDetails));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponValue = useRecoilValue(weapon);

  const { name } = ATTRIBUTES[AttributeType.Damage];

  useDeltaText({
    atomDelta: deltas(DeltaType.Damage),
    atomValue: damageTotal,
  });

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Damage details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>{weaponValue.damage}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                      <td>{`+${damageValue}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{damageTotalValue}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.Damage} />
        </>
      }
      description={
        showDamagePerSecondValue && (
          <IconDisplay
            contents={damagePerSecondValue}
            Icon={IconDamagePerSecond}
            iconProps={{ ignoreColor: true, overlayPlacement: "bottom", size: "tiny" }}
            tooltip="Total damage per second"
          />
        )
      }
      Icon={IconDamage}
      tooltip="Total damage"
    />
  );
}
