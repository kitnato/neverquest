import { useEffect } from "react"
import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond"
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails"
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general"
import { BRAWLER_DAMAGE_BONUS, BRUISER } from "@neverquest/data/traits"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconBrawler from "@neverquest/icons/brawler.svg?react"
import IconBruiser from "@neverquest/icons/bruiser.svg?react"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconLifeLeech from "@neverquest/icons/life-leech.svg?react"
import IconQuests from "@neverquest/icons/quests.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import IconStrength from "@neverquest/icons/strength.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"
import { attributeStatistic } from "@neverquest/state/attributes"
import { shield, weapon } from "@neverquest/state/gear"
import { infusionEffect } from "@neverquest/state/items"
import { questProgress, questsBonus } from "@neverquest/state/quests"
import { stamina } from "@neverquest/state/reserves"
import { damage, lifeLeech } from "@neverquest/state/statistics"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isUnarmed, isUnshielded } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass, getGearIcon } from "@neverquest/utilities/getters"

export function Damage() {
	const attributeStatisticStrength = useRecoilValue(attributeStatistic("strength"))
	const damageValue = useRecoilValue(damage)
	const infusionEffectEldritchCodex = useRecoilValue(infusionEffect("eldritch codex"))
	const isShowingDamage = useRecoilValue(isShowing("damage"))
	const isTraitAcquiredBrawler = useRecoilValue(isTraitAcquired("brawler"))
	const isTraitAcquiredBruiser = useRecoilValue(isTraitAcquired("bruiser"))
	const lifeLeechValue = useRecoilValue(lifeLeech)
	const questsBonusDamage = useRecoilValue(questsBonus("damageBonus"))
	const shieldValue = useRecoilValue(shield)
	const staminaValue = useRecoilValue(stamina)
	const weaponValue = useRecoilValue(weapon)
	const resetQuestProgressDamage = useResetRecoilState(questProgress("damage"))

	const progressQuest = useProgressQuest()

	const { burden, damage: weaponDamage } = weaponValue

	useDeltaText({
		delta: "damage",
		state: damage,
	})

	useEffect(() => {
		resetQuestProgressDamage()
		progressQuest({ amount: damageValue, quest: "damage" })
	}, [damageValue, progressQuest, resetQuestProgressDamage])

	if (isShowingDamage) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				description={<DamagePerSecond />}
				Icon={IconDamage}
				tooltip="Total damage"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<tr>
											<td>
												<IconDisplay
													Icon={getGearIcon(weaponValue)}
													iconProps={{ className: "small" }}
												>
													<span>
														{isUnarmed(weaponValue) ? "Base" : "Weapon"}
														:
													</span>
												</IconDisplay>
											</td>

											<td>
												<IconDisplay Icon={IconWeaponDamage} iconProps={{ className: "small" }}>
													<span>{formatNumber({ value: weaponDamage })}</span>
												</IconDisplay>
											</td>
										</tr>

										{isTraitAcquiredBrawler && isUnshielded(shieldValue) && (
											<tr>
												<td>
													<IconDisplay Icon={IconBrawler} iconProps={{ className: "small" }}>
														<span>Brawler:</span>
													</IconDisplay>
												</td>

												<td>
													<span>
														+
														{formatNumber({
															decimals: 0,
															format: "percentage",
															value: BRAWLER_DAMAGE_BONUS,
														})}
													</span>
												</td>
											</tr>
										)}

										{attributeStatisticStrength > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconStrength} iconProps={{ className: "small" }}>
														<span>Strength:</span>
													</IconDisplay>
												</td>

												<td>
													<Stack direction="horizontal" gap={1}>
														<span>
															+
															{formatNumber({
																value: attributeStatisticStrength,
															})}
														</span>
													</Stack>
												</td>
											</tr>
										)}

										{isTraitAcquiredBruiser && isUnarmed(weaponValue) && (
											<tr>
												<td>
													<IconDisplay Icon={IconBruiser} iconProps={{ className: "small" }}>
														<span>Bruiser:</span>
													</IconDisplay>
												</td>

												<td>
													<span>
														+
														{formatNumber({ value: staminaValue * BRUISER.damage })}
													</span>
												</td>
											</tr>
										)}

										<ElementalDetails slot="weapon" />

										{questsBonusDamage > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconQuests} iconProps={{ className: "small" }}>
														<span>Quest bonus:</span>
													</IconDisplay>
												</td>

												<td>
													<IconDisplay Icon={IconDamage} iconProps={{ className: "small" }}>
														<span>
															+
															{formatNumber({
																decimals: 0,
																format: "percentage",
																value: questsBonusDamage,
															})}
														</span>
													</IconDisplay>
												</td>
											</tr>
										)}

										{infusionEffectEldritchCodex > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconEldritchCodex} iconProps={{ className: "small" }}>
														<span>Life leech:</span>
													</IconDisplay>
												</td>

												<td>
													<IconDisplay Icon={IconLifeLeech} iconProps={{ className: "small" }}>
														<Stack direction="horizontal" gap={1}>
															<span>
																{formatNumber({
																	format: "percentage",
																	value: infusionEffectEldritchCodex,
																})}
															</span>

															{LABEL_SEPARATOR}

															<IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
																<span>
																	{formatNumber({
																		value: lifeLeechValue,
																	})}
																</span>
															</IconDisplay>
														</Stack>
													</IconDisplay>
												</td>
											</tr>
										)}

										{burden > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
														<span>On attack:</span>
													</IconDisplay>
												</td>

												<td>
													<IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
														<span>
															-
															{formatNumber({ value: burden })}
														</span>
													</IconDisplay>
												</td>
											</tr>
										)}
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
						trigger={burden > 0 || damageValue !== weaponDamage ? POPOVER_TRIGGER : []}
					>
						<span>{formatNumber({ value: damageValue })}</span>
					</OverlayTrigger>

					<DeltasDisplay delta="damage" />
				</Stack>
			</IconDisplay>
		)
	}
}
