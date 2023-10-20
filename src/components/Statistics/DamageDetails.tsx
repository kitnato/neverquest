import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import IconBrawler from "@neverquest/icons/brawler.svg?react";
import IconBruiser from "@neverquest/icons/bruiser.svg?react";
import IconStrength from "@neverquest/icons/strength.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { shield, weapon } from "@neverquest/state/gear";
import { stamina } from "@neverquest/state/reserves";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatValue } from "@neverquest/utilities/formatters";

export function DamageDetails() {
  const staminaValue = useRecoilValue(stamina);
  const strengthPowerBonus = useRecoilValue(attributePowerBonus("strength"));
  const strength = useRecoilValue(attributeStatistic("strength"));
  const isTraitAcquiredBrawler = useRecoilValue(isTraitAcquired("brawler"));
  const isTraitAcquiredBruiser = useRecoilValue(isTraitAcquired("bruiser"));
  const isUnshielded = useRecoilValue(shield).name === SHIELD_NONE.name;
  const { damage, gems, name } = useRecoilValue(weapon);

  return (
    <DetailsTable>
      <tr>
        <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

        <td>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconWeaponDamage} size="small" />

            {formatValue({ value: damage })}
          </Stack>
        </td>
      </tr>

      {gems.length > 0 && <ElementalDetails slot="weapon" />}

      <tr>
        <td className={CLASS_TABLE_CELL_ITALIC}>
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconStrength} size="small" />
            Strength:
          </Stack>
        </td>

        <td>
          <Stack direction="horizontal" gap={1}>
            {`+${formatValue({ value: strength })}`}

            {strengthPowerBonus > 0 && (
              <>
                <span>{LABEL_SEPARATOR}</span>

                <IconImage Icon={IconTomeOfPower} size="small" />

                {`+${formatValue({
                  format: "percentage",
                  value: strengthPowerBonus,
                })}`}
              </>
            )}
          </Stack>
        </td>
      </tr>

      {isTraitAcquiredBruiser && name === WEAPON_NONE.name && (
        <tr>
          <td className={CLASS_TABLE_CELL_ITALIC}>
            <Stack direction="horizontal" gap={1}>
              <IconImage Icon={IconBruiser} size="small" />
              Bruiser:
            </Stack>
          </td>

          <td>{`+${staminaValue}`}</td>
        </tr>
      )}

      {isTraitAcquiredBrawler && isUnshielded && (
        <tr>
          <td className={CLASS_TABLE_CELL_ITALIC}>
            <Stack direction="horizontal" gap={1}>
              <IconImage Icon={IconBrawler} size="small" />
              Brawler:
            </Stack>
          </td>

          <td>x2</td>
        </tr>
      )}
    </DetailsTable>
  );
}
