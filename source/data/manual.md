# neverquest

_An irreverent UI-based incremental Souls-like._

> This manual contains content spoilers. It is best used to reference an aspect of the game as needed.

## Gameplay

The [wilderness](#wilderness) **stage** initially harbors a lurking [monster](#monster). Choosing to **attack** does so continuously based on the [attack rate](#attack-rate), **engaging** the monster in the process.

While engaged, the monster will also attack continuously, triggering **defense**. When the monster successfully strikes, [recovery](#recovery-rate) is triggered. While recovering, you can't attack or regenerate your [reserves](#reserves).

Both you and monster will keep attacking one another until either you **retreat**, or either one of you dies (health reaches zero). Retreating will allow the monster to instantaneously regenerate all of its health (if it isn't [ailing](#burning)).

Upon a monster's death, the stage's **progress** is incremented, its remains are its remains are **looted** for [essence](#essence) and any [gems](#gems) and the next monster is engaged immediately, unless you retreat.

Once the wilderness is cleared of monsters, all looted resources can be **collected** and you enter a **resting** state. At this point, **travel** to the [caravan](#caravan) becomes possible.

The caravan allows interacting with a crew that provides essential services like accessing higher stages and unlocking new capabilities.

## You

Your [reserves](#reserves), [statistics](#statistics), [essence](#essence), [ailments](#ailments), and your name, should you choose one.

### Reserves

Determine your basic status.

#### Health

Total amount of damage you can take before game over at 0 health.

Health is [regenerated](#health-regeneration) over time.

#### Stamina

Several combat actions require stamina to execute them successfully. Most [gear](#gear) has a burden for an associated action which translate to a stamina cost that must be paid to be successful. For instance, when wielding a [weapon](#weapons) with burden 3, 3 stamina is paid on every hit. Wearing armor has a passive burden that is paid when struck.

When there is not enough stamina available for an attack, [parrying](#parry-rating), [dodging](#dodge-chance) or [blocking](#block-chance), exhaustion occurs in which none of these actions are possible until sufficient stamina is [regenerated](#stamina-regeneration).

### Essence

Collected by looting dead monsters.

Primarily spent on acquiring attribute ranks. Also used to trade at the [caravan](#caravan) and pay for [gems](#gems) and [infusions](#infusable-trinkets). Essence cost increases for every allocation of an attribute rank.

### Attributes

For each rank of its ranks, an attribute provides an increasingly powerful effect and raises your power level by 1.

[Essence](#essence) is used to allocate attribute ranks. The cost of allocation is increased for every attribute based on your power.

#### Agility

Affects [dodge chance](#dodge-chance). Requires the [evasion](#evasion) skill.

#### Dexterity

Affects [critical](#critical-rating) chance. Requires the [assassination](#assassination) skill.

#### Endurance

Affects maximum [total stamina](#stamina).

#### Fortitude

Affects [health](#health-regeneration) and [stamina](#stamina-regeneration) regeneration amounts in equal measure. Requires the [calisthenics](#calisthenics) skill.

#### Perception

Affects [critical](#critical-rating) damage. Requires the [assassination](#assassination) skill.

#### Speed

Affects the [rate](#attack-rate) of attacks.

#### Strength

Affects [total damage](#total-damage) of an attack.

#### Vigor

Affects [health](#health-regeneration) and [stamina](#stamina-regeneration) regeneration rates. Requires the [calisthenics](#calisthenics) skill.

#### Vitality

Affects maximum total [health](#health).

### Statistics

Derived from [attributes](#attributes), [gear](#gear), [skills](#skills), [masteries](#masteries), [traits](#traits) and any current [ailments](#character-ailments).

#### Damage per second (DPS)

Displays the expected damage per second (DPS) you (and the monster) can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical](#critical-rating) strikes.

Requires toggling on in the global [settings](#settings) for it to show.

#### Attack rate

The time duration between attacks. Does not take into account [recovery rate](#recovery-rate).

#### Bleed rating

A value determined by the chance of inflicting [bleed](#bleed) alongside total bleed damage, which is a percentage of weapon damage, and its duration. Only applies if a [piercing](#piercing-weapons) weapon is equipped.

The bleed damage is increased by mastering [cruelty](#cruelty).

Requires the [anatomy](#anatomy) skill.

#### Block chance

A percentage determining the chance that when defending, all incoming damage is avoided. Blocking triggers [recovery](#recovery) and may also inflict [stagger].

Determined by the equipped [shield](#shields).

#### Critical rating

A value determined by the chance that upon attacking, increased (critical) damage is dealt based on a multiplier of current [total damage](#total-damage).

Critical chance can be increased with the [dexterity](#dexterity) attribute and its damage with the [perception](#perception) attribute.

Requires the [assassination](#assassination) skill.

### Deflection chance

A percentage chance for you to completely ignore all effects of an incoming [ailment](#monster-ailments). Only applies if suitable [armor](#armor) is equipped.

Requires the [armorcraft](#armorcraft) skill.

#### Dodge chance

A percentage determining the chance of when defending, all damage is avoided entirely. Any equipped armor's burden incurs a stamina cost.

The dodge chance can be increased with the [agility](#agility) attribute.

Requires the [evasion](#evasion) skill.

#### Execution threshold

A percentage determining the amount of monster health required before the next attack will kill it outright. Only applies if a [two-handed](#two-handed) weapon is equipped.

The monster health threshold is increased by mastering [butchery](#butchery).

Requires the [siegecraft](#siegecraft) skill.

#### Health regeneration

The amount of [health](#health) restored according to a certain rate.

The restoration amount can be increased with the [vigor](#vigor) attribute and its rate with the [fortitude](#fortitude) attribute.

Requires the [calisthenics](#calisthenics) skill.

#### Parry rating

A value determined by the chance of successfully parrying when defending, along with the damage that is absorbed (after [protection](#protection)) and reflected back as a result. Only applies if a [slashing](#slashing-weapons) weapon is equipped.

The absorbed & reflected damage is increased by mastering [finesse](#finesse).

Requires the [escrime](#escrime) skill.

#### Protection

The amount of damage that is discarded from the total incoming damage when defending.

Determined primarily through [armor](#armor).

#### Range

The distance the monster needs to travel once engaged before it can start attacking. Only applies if a [ranged weapon](#ranged-weapons) is equipped.

It is determined by the equipped ranged weapon and can be decreased by mastering [marksmanship](#marksmanship).

Requires the [archery](#archery) skill.

#### Recovery rate

The time duration until full [recovery](#recovery) from a monster's successful attack.

Can be decreased by mastering [resilience](#resilience).

#### Stagger rating

A value determined by the chance to [stagger](#stagger) and the stagger duration. Only applies if a [shield](#shields) is equipped.

The stagger duration can be increased by mastering [stability](#stability).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stun rating

A value determined by the chance to [stun](#stun) and the stun duration. Only applies if an appropriate [blunt](#blunt-weapons) weapon is equipped.

The stun duration can be increased by mastering [might](#might).

Requires the [traumatology](#traumatology) skill.

#### Stamina regeneration

The amount of [stamina](#stamina) restored according to a certain rate.

The restoration amount can be increased with the [vigor](#vigor) attribute and its rate with the [fortitude](#fortitude) attribute.

Requires the [calisthenics](#calisthenics) skill.

#### Total damage

The damage from the equipped [weapon](#weapons) in addition to [strength](#strength) along with any other bonuses that together are inflicted with every attack.

## Encounter

The panel to the right of the screen. It changes based on one of the two possible locations, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness stage has a randomly-generated name and contains a certain amount of monsters whose abilities are determined by the stage and current progress.

The stage is considered completed when the progress is at its maximum, which is after having killed all the monsters. At this point, all loot can be collected and you can travel to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack you as soon as it's engaged. It has health and a certain attack rate both determined by the current stage.

#### Bosses

A monster that is much more powerful than a standard monster of that stage. They appear every 5 stages, starting at stage 10. It's the only monster on that stage, and once defeated, it drops a [gem](#gems) and under special circumstances it may also drop a [trinket](#trinkets).

### Caravan

Encountered after completing the current [wilderness](#wilderness) stage.

All goods and services offered by the caravan crew are purchasable with [essence](#essence). Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will increase the stage (if the previous wilderness was left at the maximum stage).

The [merchant](#merchant) is always present from the start. Other crew members can be hired at a cost of essence, who then offer different goods and services. More crew become available for hire as the stage increases.

#### Alchemist

Offers conversion of [gems](#gems) between one another. Also offers special alchemical training under certain circumstances.

#### Blacksmith

Crafts [armor](#armor), [melee weapons](#melee-weapons) and [shields](#shields).

#### Fletcher

Crafts [ranged weapons](#ranged-weapons) and sells ammunition.

Requires the [archery](#archery) skill.

#### Medic

Offers full healing in exchange for essence. Also sells [bandages](#bandages) that fully restore health.

#### Mercenary

Offers training of new [skills](#skills).

#### Merchant

Purchase and sell [items](#item). The merchant's inventory of items will grow and diversify after each new stage.

#### Occultist

Offers purging rituals, such as resetting your power level that refunds all spent essence. Also sells phylacteries that resurrect you upon death.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance). Also offers expansion of the ammunition pouch.

#### Witch

Sells [potions](#potions) in exchange for essence.

## Inventory

The inventory is accessible as soon as you acquire the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all gear is automatically equipped if possible and [encumbrance](#encumbrance) can't be extended via the [tailor](#tailor).

### Item

An item can either be;

- a) a piece of [gear](#gear), or
- b) a consumable like a [potion](#potions), or
- c) a [trinket](#trinkets) that grants a special effect and/or an action while part of the inventory, such as the ammunition pouch.

Every item, apart from the [knapsack](#knapsack), has an associated weight that affects [encumbrance](#encumbrance).

### Knapsack

Allows for the storage of items. Allows equipping and un-equipping [gear](#gear). Purchasable from the [merchant](#merchant).

### Encumbrance

The inventory size is constrained by encumbrance, to which each carried or equipped item adds a certain amount based on its weight. No further items can be acquired until the remaining encumbrance allows for it.

Viewing encumbrance and managing it can only be accomplished once the [knapsack](#knapsack) is acquired.

### Gear

Items that can be equipped and unequipped from the inventory.

The [merchant](#merchant) sells one of each gear type of various levels. To acquire improved gear, they need to be crafted by the [blacksmith](#blacksmith).

#### Weapons

Weapons are the main way of fighting monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them. Taking 2 slots mean an [shield](#shields) can no longer be equipped.

##### Melee weapons

Close-quarter combat starts the moment the monster is engaged, with either party's [attack rate](#attack-rate) determining the pace of combat.

###### One-handed

- 1 slot
- Medium damage
- High attack rate
- Low burden
- Low purchase & crafting cost
- Low weight

###### Two-handed

Takes up both the main and [shield](#shields) slots.

- 2 slots
- High damage
- Medium attack rate
- High burden
- High purchase & crafting cost
- High weight

There is also a chance to [execute](#execution-threshold) monsters when at or under a certain health threshold or under.

##### Ranged weapons

- 2 slots
- Low damage
- Low attack rate
- Medium burden
- Medium purchase & crafting cost
- Medium weight

There is also a certain [range](#range) that delays contact with the monster.

They require finite ammunition as part of the second slot, which can be purchased from the [fletcher](#fletcher) once the correct trinket has been acquired from the [merchant](#merchant).

Requires the [archery](#archery) skill.

##### Weapon class

Whatever its melee or ranged, a weapon additionally falls into one of several classes that intrinsically grants certain modifiers. These modifiers are only relevant if the associated [skill](#skills) is acquired.

###### Blunt weapons

Adds chance to [stun](#stun) for a certain duration. Not wielding any weapon, i.e. being unarmed, is considered as having the blunt class.

Stun requires the [traumatology](#traumatology) skill.

###### Piercing weapons

Chance to inflict [bleed](#bleed).

Bleed requires the [anatomy](#anatomy) skill.

###### Slashing weapons

Chance to [parry](#parry-rating).

Parry requires the [escrime](#escrime) skill.

#### Armor

Armor provides [protection](#protection). When receiving damage, if the armor has thorns, then that damage is simultaneously inflicted upon the attacker.

Each of the following armor classes increases the protection value for certain tradeoffs.

##### No armor

No initial modifiers.

##### Light armor

- Low protection
- Low burden
- Low purchase & crafting cost

##### Reinforced armor

- Medium protection
- Low [deflection](#deflection-chance) chance
- Medium burden
- Medium purchase & crafting cost

##### Heavy armor

- High protection
- High deflection chance
- High burden
- High purchase & crafting cost

#### Shields

Grants a percentage chance to [block](#block-chance) all incoming damage. Also grants [stagger chance](#stagger) with the acquisition of the [Traumatology](#traumatology) skill.

##### Small shields

- Low chance to block
- Low stagger chance
- Low burden
- Low purchase & crafting cost

##### Medium shields

- Medium chance to block
- Medium stagger chance
- Medium burden
- Medium purchase & crafting cost

##### Tower shields

- High chance to block
- High stagger chance
- High burden
- High purchase & crafting cost

#### Gems

Gems are items that can be applied to gear. They are dropped by [bosses](#bosses), one at stage 10 and one more for each boss encounter after that (resulting in e.g. four gems being dropped by a stage 25 boss).

Up to 5 gems can be applied to a piece of gear. Once applied, gems are consumed and cannot be removed or moved to a different piece of gear.

The gem types are the following, associated with their corresponding [elemental damage](#elemental-damage) types:

- Ruby (fire)
- Sapphire (ice)
- Topaz (lightning)

Gems add the following benefits to gear:

- Weapon: adds damage based on base damage. Once an attack hits, the corresponding elemental effect is also applied.
- Armor: adds [thorns](#armor) damage based on protection. If thorns are inflicted, the corresponding elemental effect is applied as well.
- Shield: increases the potency of the elemental damage and duration of the elemental effect of both armor and weapon gems of the same type.

Every applied gem of the same type to the same piece of gear increases its corresponding elemental potency.

##### Elemental damage

The elemental damage types are the following, associated with their corresponding ailment:

- Fire inflicts [burning](#burning).
- Ice inflicts [frozen](#frozen).
- Lightning inflicts [shocked](#shocked).

A monster can be afflicted by any combination of elemental ailment, the severity of which is determined by the number of gems applied to gear.

#### Trinkets

Trinkets enable various actions or grant certain effects if they are carried in the [inventory](#inventory).

##### Static trinkets

These provide a permanent effect of some sort while they are carried in the inventory. If one is sold or lost, the effect disappears alongside it.

##### Usable trinkets

In addition to potentially providing a [static](#static-trinkets) effect, these trinkets also allow direct interaction, usually granting a new action.

##### Infusable trinkets

Some of usable trinkets are infusable, meaning they allow [essence](#essence) to be spent on them to upgrade their effect via infusion levels.

###### Tome of Power

This infusable trinket, while carried in the [knapsack](#knapsack), provides a bonus to all attributes by their respective percentage amount (each extent of which is shown when increasing [attributes](#attributes)) multiplied by your current power level.

For example, if you are carrying a level 0 Tome of Power, your power level is 25, the attribute in question is at rank 5, a given attribute rank would increase a given statistic by 10, and the boosted percentage is 1%, the statistic value is calculated as follows:

> 5 attribute ranks × 10 + 25 power levels × 1% bonus per rank = 62.5 (50 if no Tome was owned)

Additionally, each infusion level boosts this bonus percentage. In case the Tome is infused to grant a bonus boost of +5%, the calculation would be as follows:

> 5 × 10 + 25 × 1.05% = 63.125

### Consumables

A single-use item.

#### Bandages

Sold by the [medic](#medic).

Fully restores health on use. Does not affect [poison](#poison).

#### Potions

Sold by the [witch](#witch).

##### Antidote

Cures and removes [poison](#poison).

##### Elixir

Fully restores [stamina](#stamina). Does not affect [blight](#blight).

##### Salve

Cures and removes [blight](#blight).

#### Phylactery

Sold by the [occultist](#occultist).

While present in the [inventory](#inventory), automatically revives you upon death. The item is consumed in the process.

## Masteries

Using a particular piece of [gear](#gear) trains and increases its associated mastery. Acquiring a mastery to train requires the acquisition of its associated [skill](#skills).

Each mastery starts at rank 0 and requires a certain amount of accumulated training progress before the next rank is achieved.

### Butchery

Progress is gained by using [two-handed](#two-handed) weapons. Each rank increases the [execution](#execution-threshold) threshold.

Requires the [siegecraft](#siegecraft) skill.

### Cruelty

Progress is gained by using [piercing](#piercing-weapons) weapons. Each rank increases [bleed](#bleed) damage.

Requires the [anatomy](#anatomy) skill.

### Finesse

Progress is gained by using [slashing](#slashing-weapons) weapons. Each rank increases [parry](#parry-rating) & damage.

Requires the [escrime](#escrime) skill.

### Marksmanship

Progress is gained by using [ranged weapons](#ranged-weapons). Each rank increases [range](#range) and thus distance of the monster it's when first engaged.

Requires the [archery](#archery) skill.

### Might

Progress is gained by using [blunt](#blunt-weapons) weapons. Each rank increases how many of its attacks the monster is [stunned](#stun) for.

Requires the [traumatology](#traumatology) skill.

### Stability

Progress is gained by successfully [blocking](#block-chance) with [shields](#shields). Each rank increases the [stagger](#stagger) duration.

Requires the [shieldcraft](#shieldcraft) skill.

### Resilience

Progress is gained when defending. Each rank reduces [recovery](#recovery-rate) .

Requires the [armorcraft](#armorcraft) skill.

## Skills

Skills are acquired from the [mercenary](#mercenary) and bestow a permanent ability. They can unlock certain [attributes](#attributes), [statistics](#statistics) or [masteries](#masteries).

### Anatomy

Unlocks [bleed](#bleed) when using [piercing](#piercing-weapons) weapons. Also unlocks the [Cruelty](#cruelty) mastery.

### Archery

Allows the use of [ranged weapons](#ranged-weapons). Also unlocks the [marksmanship](#marksmanship) mastery.

### Armorcraft

Allows the use of [heavy](#heavy-armor) armor. Also unlocks the [resilience](#resilience) mastery and the [deflection](#deflection-chance) ability.

### Assassination

Unlocks [dexterity](#dexterity) and [perception](#perception) attributes.

### Calisthenics

Unlocks the [fortitude](#fortitude) and [vigor](#vigor) attributes.

### Escrime

Unlocks the ability to [parry](#parry-rating) when using [slashing](#slashing-weapons) weapons. Also unlocks the [finesse](#finesse) mastery.

### Evasion

Unlocks [agility](#agility) attribute and [dodge chance](#dodge-chance) modifiers on gear.

### Siegecraft

Unlocks the use of [two-handed](#two-handed) weapons that have a chance to [execute](#execution-threshold).

Requires hiring the [blacksmith](#blacksmith).

### Shieldcraft

Unlocks the use of [tower](#tower-shields) shields alongside the ability to [stagger](#stagger) monsters. Also unlocks the [stability](#stability) mastery.

Requires hiring the [blacksmith](#blacksmith).

### Traumatology

Unlocks the ability to [stun](#stun) when attacking with [blunt](#blunt-weapons) weapons. Also unlocks the [might](#might) mastery.

## Ailments

Temporary, negative status effects that can afflict you or monster.

### Character ailments

Ailments that are inflicted by monsters when defending.

#### Blight

Blight can be inflicted by a monster while you are poisoned already, during which maximum [stamina](#stamina) is reduced by a certain percentage. The magnitude of the stamina reduction and chance of inflicting blight is proportional to the wilderness stage in which the monster resides.

Monsters won't exhibit blight until later [wilderness](#wilderness) stages.

This effect can be cured by a [salve](#salve). It can also be avoided if an attack is successfully [deflected](#deflection-chance).

#### Poison

Certain successful attacks by the monster can afflict you with poison, reducing maximum [health](#health) by a certain percentage. The magnitude of the health reduction and chance of inflicting poison is proportional to the wilderness stage in which the monster resides.

The effect gradually wears off as maximum health is restored over time, during which all healing effects can only restore health up to the currently-reduced maximum.

Monsters won't exhibit poison until later [wilderness](#wilderness) stages. Once poisoned, there is also a chance for certain monsters to inflict [blight](#blight).

This effect can be cured by an [antidote](#antidote). It can also be avoided if an attack is successfully [deflected](#deflection-chance).

#### Recovery

Recovery occurs when damage is dealt, halting regeneration of [reserves](#reserves) and any [attack](#attack-rate) progress. Its duration is determined by the [recovery rate](#recovery-rate).

### Monster ailments

Ailments that are inflicted by you when attacking.

#### Bleed

Certain successful attacks with a [piercing](#piercing-weapons) weapon can inflict bleeding on the monster, consisting of a proportional amount of damage inflicted regularly over a certain period of time. The extent of this is determined by the [bleed-rating](#bleed-rating).

Requires the [anatomy](#anatomy) skill.

#### Burning

Inflicted by fire [elemental](#elemental-damage) damage. When burning, the monster cannot regenerate.

#### Frozen

Inflicted by ice [elemental](#elemental-damage) damage. When frozen, attack rate and movement speed (time to close [distance](#range)) is slowed.

#### Shocked

Inflicted by lightning [elemental](#elemental-damage) damage. When shocked, damage dealt is reduced.

#### Stagger

While staggered, the monster takes more damage from all sources. The extent of this is determined by the [stagger rating](#stagger-rating).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stun

While stunned, the monster's hit accuracy is reduced, meaning it may miss completely. The extent of this is determined by the [stun rating](#stun-rating).

Requires the [traumatology](#traumatology) skill.

## Retirement

When reaching a certain stage, retirement is unlocked. This restarts the quest from stage 1 with power level 0, no essence, no skills and no gear. However, all hired caravan crew are retained, and so are certain [trinkets](#trinkets). A [trait](#traits) can be also chosen that confers a permanent bonus.

### Traits

Traits are permanent passive abilities acquired upon [retiring](#retirement) for all subsequent new quests. One may be chosen at a time for every retirement.

#### Brawler

Being unshielded increases one-handed melee damage.

#### Bruiser

Current stamina adds to unarmed damage & unarmed attacks have a chance to [stun](#stun). Stunning requires the [traumatology](#traumatology) skill.

#### Colossus

[Two-handed](#two-handed) melee weapons are used as one-handed. This means a shield can be equipped alongside it and any effects applicable to one-handed weapons apply to two-handed weapons as well.

#### Executioner

[Critical](#critical-rating) strikes with a two-handed weapon always [execute](#execution-threshold) the monster. Critical strikes require the [assassination](#assassination) skill.

#### Inoculated

A [deflection](#deflection-chance) chance base value is added to the current deflection chance.

#### Nudist

[Dodge](#dodge-chance) rate is doubled when not wearing any armor. This is capped out at the maximum possible dodge rate, effectively reducing the amount of attribute points required in [agility](#agility) to reach it.

#### Sharpshooter

While at [range](#range), all attacks with a [ranged](#ranged-weapons) weapon are critical strikes.

#### Shredder

[Bleed](#bleed) damage is inflicted all at once (instead of being evenly spread over a certain duration).

#### Stalwart

There are no stamina penalties when wearing armor.

#### Tank

Total [protection](#protection) is increased by the equipped shield's block chance.

### Quests

Quests are similar to achievements in that they have a set of requirements and progress based on certain gameplay actions and states. They are unlocked only once the journal [trinket](#usable-trinkets) is acquired, then going into [retirement](#retirement) at least once.

Once a quest's requirements are achieved, the quest can be completed by choosing a permanent bonus to either [health](#health), [stamina](#stamina) or [total damage](#total-damage) that persists through retirement and while the journal is in the inventory.

Quests are categorized into the following:

#### Conquests

Tracks combat-based activities.

#### Routines

Tracks all non-combat-related activities.

#### Triumphs

A collection of challenges and hard-to-reach goals.

## Settings

These are accessible via the page header. They allow the activation and deactivation of certain gameplay features.

### Low health warning

Toggles a popover warning to prompt a retreat when you's [health](#health) drops below 33% of its maximum.

Default: on.

### Auto-equip new gear

Toggles the automatic equipping of [weapons](#weapons), [armor](#armor) and [shields](#shields) once they are acquired. Cannot be set to off until the [knapsack](#knapsack) is acquired.

Default: on.

### Show damage per second (DPS)

Toggles DPS displays for you, weapons and [monster](#monster).

Default: off.

### Show gear comparisons

Toggles icons in the [gear](#gear) details overlays that indicate upgrades or downgrades for each of the properties.

Default: on.

### Show gear level

Toggles between showing and hiding the gear level.

Default: off.

### Show everything

Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and become relevant. Suitable for veteran players starting a new run.

## Roadmap

neverquest is a work-in-progress. Several features are pending ideation, refinement and implementation.

### Activated skills

Once acquired, activating a skill requires [energy](#energy).

#### Auras

Cast spells that remain active until dispelled. Provides an effect in return for reserving a percentage of energy.

#### Physical (activated)

Combat skills that can be activated during combat. Acquired from the [Mercenary](#mercenary).

#### Sorceries

Cast spells with immediate and/or over-time effects. Acquired from the [sorcerer](#sorcerer).

### Energy

A [reserve](#reserves), consumed when activating [skills](#skills), [auras](#auras) and [sorceries](#sorceries), regenerated over time.

### New attributes

#### Acumen

Affects [sorcery](#sorceries) casting rate.

#### Intellect

Affects energy regeneration rate.

#### Wisdom

Affects total [energy](#energy).

### New caravan crew

Along with two more additional hires, the entire crew monologue system needs to be overhauled and expanded to allow for better storytelling.

#### Cook

Sells hot meals that restore all [energy](#energy) when used.

Grants a Well Fed bonus for the next stage (+25% [mastery](#masteries) gain).

#### Sorcerer

Acquire [sorceries](#sorceries) and [auras](#auras).

### Log

A toggle-able UI element that displays all stateful activities in real-time, e.g. combat details, transactions etc.

### Venom

A [potion](#potions), that once applied to a weapon, it adds an effect with each strike, applying damage-over-time effects and potentially other ailments. Has a certain number of charges before it is used up.
