import { useState } from "react";
import { Button, FormControl, FormSelect, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resource/Coins";
import { Scrap } from "@neverquest/components/Resource/Scrap";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { WEAPON_ABILITY_NAME, WEAPON_SKILL_TYPE } from "@neverquest/data/gear";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/blade-fall.svg";
import { ReactComponent as IconClass } from "@neverquest/icons/gear-hammer.svg";
import { ReactComponent as IconStaminaCost } from "@neverquest/icons/ink-swirl.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/perspective-dice-six-faces-random.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/pointy-sword.svg";
import { ReactComponent as IconLevel } from "@neverquest/icons/private-first-class.svg";
import { ReactComponent as IconWeight } from "@neverquest/icons/weight-crush.svg";
import { AffixTag, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { level } from "@neverquest/state/encounter";
import { coins, scrap } from "@neverquest/state/resources";
import { isNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { UIVariant } from "@neverquest/types/ui";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { generateWeapon } from "@neverquest/utilities/generators";

export function WeaponOptions() {
  const isNSFWValue = useRecoilValue(isNSFW);
  const levelValue = useRecoilValue(level);
  const coinsValue = useRecoilValue(coins);
  const scrapValue = useRecoilValue(scrap);

  const [weaponClass, setWeaponClass] = useState(WeaponClass.Blunt);
  const [weaponLevel, setWeaponLevel] = useState(levelValue);

  const skillValue = useRecoilValue(skills(WEAPON_SKILL_TYPE[weaponClass]));

  const { abilityChance, coinPrice, ranges, scrapPrice, staminaCost, weight } = generateWeapon({
    hasPrefix: true,
    hasSuffix: true,
    isNSFW: isNSFWValue,
    level: weaponLevel,
    tags:
      weaponLevel < levelValue - 1
        ? [AffixTag.LowQuality]
        : weaponLevel > levelValue + 1
        ? [AffixTag.HighQuality]
        : undefined,
    type: WeaponType.Melee,
    weaponClass,
  });
  const hasCoins = coinPrice <= coinsValue;
  const hasScrap = scrapPrice <= scrapValue;
  const isCraftable = hasCoins && hasScrap;
  const maximumWeaponLevel = levelValue + 3;

  const handleCraft = () => {
    // TODO
  };

  return (
    <Stack className="mx-auto w-50" gap={3}>
      <Stack className="mx-auto w-50" gap={3}>
        <IconDisplay
          contents={
            <FormControl
              max={maximumWeaponLevel}
              min={1}
              onChange={({ target: { value } }) => {
                if (!value) {
                  return;
                }

                const parsedValue = Number.parseInt(value);

                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumWeaponLevel) {
                  return;
                }

                setWeaponLevel(parsedValue);
              }}
              type="number"
              value={weaponLevel}
            />
          }
          Icon={IconLevel}
          iconProps={{ placement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setWeaponClass(value as WeaponClass)}
              value={weaponClass}
            >
              <option value={WeaponClass.Blunt}>{capitalizeAll(WeaponClass.Blunt)}</option>
              <option value={WeaponClass.Piercing}>{capitalizeAll(WeaponClass.Piercing)}</option>
              <option value={WeaponClass.Slashing}>{capitalizeAll(WeaponClass.Slashing)}</option>
            </FormSelect>
          }
          Icon={IconClass}
          iconProps={{ placement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${ranges.damage.minimum}-${ranges.damage.maximum}`}
          Icon={IconDamage}
          iconProps={{ placement: "left" }}
          tooltip="Damage"
        />

        <IconDisplay
          contents={`${formatMilliseconds(ranges.rate.minimum)}-${formatMilliseconds(
            ranges.rate.maximum
          )}`}
          Icon={IconAttackRate}
          iconProps={{ placement: "left" }}
          tooltip="Attack rate"
        />

        <IconDisplay
          contents={skillValue ? formatPercentage(abilityChance) : LABEL_UNKNOWN}
          Icon={skillValue ? IconAttackRate : IconUnknown}
          iconProps={{ placement: "left" }}
          tooltip={skillValue ? `${WEAPON_ABILITY_NAME[weaponClass]} chance` : LABEL_UNKNOWN}
        />

        <IconDisplay
          contents={staminaCost}
          Icon={IconStaminaCost}
          iconProps={{ placement: "left" }}
          tooltip="Stamina cost"
        />

        <IconDisplay
          contents={weight}
          Icon={IconWeight}
          iconProps={{ placement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      <Stack direction="horizontal" gap={5}>
        <Scrap tooltip="Cost (scrap)" value={scrapPrice} />

        <Coins tooltip="Price (coins)" value={coinPrice} />

        <OverlayTrigger
          overlay={
            <Tooltip>
              {!hasCoins && <div>Not enough coins!</div>}
              {!hasScrap && <div>Not enough scrap!</div>}
            </Tooltip>
          }
          placement="top"
          trigger={isCraftable ? [] : ["hover", "focus"]}
        >
          <span className="d-inline-block w-100">
            <Button
              className="w-100"
              disabled={!isCraftable}
              onClick={handleCraft}
              variant={UIVariant.Outline}
            >
              Craft
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </Stack>
  );
}
