# Manual

There are two panels: the [character](#character) (left) and the [encounter](#encounter) (right), with interactions between the two taking place via a column of control buttons in between them.

## Character

The main panel on the left of the UI. View the character's [reserves](#reserves), [statistics](#statistics), [resources](#resources), [ailments](#ailments), and set their name.

### Reserves

Determine the basic status of the character.

#### Health

Total amount of damage the character can take before game over at 0 health.

It is [regenerated](#health-regeneration-rate) over time.

#### Stamina

If the character is wielding a [weapon](#weapons) with a stamina cost, this cost is paid with every [attack](#combat). If they are wielding a [shield](#shields) with a stamina cost, this is paid every time there is a successful [block](#block) while [defending](#combat).

If there isn't enough stamina in reserve when attacking or blocking, the character is considered [exhausted](#exhaustion) and no attacks or blocks can take place.

It is [regenerated](#stamina-regeneration-rate) over time, at a faster initial pace than health.

### Resources

Collected by [looting](#looting) dead monsters and selling or dismantling [gear](#gear) at the [caravan](#caravan).

#### Coins

Gained from selling scrap and [items](#item) to the [merchant](#merchant) and dropped by certain rare monsters. Used to pay for [caravan](#caravan) crew, some of their services and any item purchases.

#### Essence

Gained from killing monsters and disenchanting gear. Primarily spent on attribute ranks. Essence cost increases for every such rank allocation.

#### Scrap

Gained from dismantling [gear](#gear) at the blacksmith and dropped from monsters. Used to craft gear and trade for coins.

### Attributes

Attributes each provide a direct increasing effect for each rank. Each rank allocation raises the character's level by 1.

[Essence](#essence) is used to allocate ranks. The cost of allocation is increased for every rank.

#### Agility

Affects [dodge chance](#dodge-chance). Required skill: [Evasion](#evasion).

#### Dexterity

Affects [critical chance](#critical-chance). Required skill: [Assassination](#assassination).

#### Endurance

Affects maximum [total stamina](#stamina).

#### Fortitude

Affects [stamina regeneration rate](#stamina-regeneration-rate).

#### Luck

Affects the amount of loot dropped by monsters. Must be included with a special [trinket](#trinkets).

#### Perception

Affects [critical damage](#critical-damage). Required skill: [Assassination](#assassination).

#### Speed

Affects [rate of attack](#attack-rate).

#### Strength

Affects [total damage](#total-damage) of an attack.

#### Vigor

Affects [health regeneration rate](#health-regeneration-rate).

#### Vitality

Affects maximum [total health](#health).

### Statistics

Derived from the character's [attributes](#attributes), [gear](#gear), and any current [ailments](#ailments).

#### Damage per second

Requires toggling on in the global [settings](#settings). If on, shows the expected damage per second the character can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical strikes](#critical-chance).

#### Attack rate

Time duration between attacks, not considering any interruptions such as [recovery](#recovery-rate).

#### Bleed chance

Percentage determining the chance that when attacking, the given [bleed damage](#bleed-damage) of the current weapon's damage is inflicted on the monster over 2.5 seconds.

#### Bleed damage

Percentage of the weapon's total damage that is inflicted over time after a successful attack with bleed. Proportional to this total is taken every 500 milliseconds until duration (2.5 seconds total) is complete.

Can be increased by mastering [Cruelty](#cruelty).

#### Block chance

Percentage determining the chance that when defending, all incoming non-protected damage is blocked.

#### Critical chance

Percentage determining the chance that upon attacking, [critical damage](#critical-damage) is dealt.

Can be increased with the [Dexterity](#dexterity) attribute.

#### Critical damage

Percentage increase of [total damage](#total-damage) dealt when attacking with a [critical strike](#critical-strike).

Can be increased with the [Perception](#perception) attribute.

#### Dodge chance

Percentage determining the chance of when defending, the character avoids all damage entirely.

Can be increased with the [Agility](#agility) attribute.

#### Health regeneration rate

Time duration until [health](#health) is restored by one point.

Can be increased with the [Vigor](#vigor) attribute.

#### Parry absorption

Percentage of attacking damage after current [protection](#protection) that is subtracted upon a successful parry (base: 33%). Can be increased by mastering [Finesse](#finesse).

#### Parry chance

Percentage chance determining a successful [parry](#parry) when defending.

#### Parry damage

Percentage of attacking damage that is inflicted on the attacker upon a successful parry (base: 25%). Can be increased by mastering [Finesse](#finesse).

#### Protection

Amount of damage that is discarded from the total when defending. This is determined primarily through [armor](#armor) and other [gear](#gear).

#### Recovery rate

Time until character recovers from a monster's successful attack. This duration can be decreased with the [resilience](#resilience) mastery.

#### Stagger chance

Percentage determining the chance of [staggering](#stagger) the monster when attacking or defending based primarily on the current [gear](#gear) ([shields](#shields) and [blunt weapons](#blunt-weapon)) for a certain [duration](#stagger-duration).

#### Stagger duration

Time until the monster recovers from [staggering](#stagger) until it can continue attacking.

Can be increased by mastering [Might](#might).

#### Stamina regeneration rate

Time duration until [stamina](#stamina) is restored by one point.

Can be increased with the [Fortitude](#fortitude) attribute.

#### Total damage

Damage from [strength](#strength) in addition to [weapon](#weapons) damage along with any other bonuses that is applied on every [attack](#combat).

## Combat

The [wilderness](#wilderness) **stage** initially always has a lurking [monster](#monster). When ready, the character can choose to **attack** continuously based on their [attack rate](#attack-rate), **engaging** the monster in the process. While engaged, the monster will also attack continuously, triggering the character to **defend** themselves. When the monster strikes the character, [recovery](#recovery-rate) is triggered. While recovering, the character won't be able to attack or regenerate their [reserves](#reserves).

Both the character and monster will keep attacking one another until either the character **retreats**, upon which the monster's health instantly regenerates to its maximum, or if the monster or character is dead (one of either's health reaches zero).

Upon a monster's death, the stage's **progress** is incremented, its remains are looted and the next monster is engaged automatically, unless the character retreats.

The character will enter a **resting** state once the stage is complete and there are no more monsters to fight, or when they **travel** to the [caravan](#caravan).

### Combat mechanics

Apart from the ones marked in bold in the [combat](#combat) section, there are several additional mechanics that occur during combat.

Some of the following effects are intrinsic to gear and aren't controlled directly the way [attributes](#attributes) are.

#### Block

A successful block by the character upon a monster's attack will negate all damage done, yet costs [stamina](#stamina). Blocking may also inflict [stagger](#stagger) on the monster, depending on the acquisition of the [Traumatology](#traumatology) skill.

The overall chance to block an attack is determined by the [block chance](#block-chance) statistic and is determined primarily by wielding a [shield](#shields).

#### Critical Strike

An attack might deal extra damage, which is determined by the [chance](#critical-chance) to do so and the overall [damage multiplier](#critical-damage).

#### Deflection

The chance for the character to completely ignore all effects of an incoming [ailment](#ailments).

Deflecting an ailment is only possible after acquiring the [Armorcraft](#armorcraft) skill.

#### Dodge

Dodging an incoming attack negates all damage, but doesn't cost any stamina the way [blocking](#block) does, but only if no [armor](#armor) or [hide](#hide-armor) armor is worn. [Reinforced](#reinforced-armor) armor incurs a stamina cost for dodging, and [plate](#plate-armor) removes the ability to dodge altogether.

The overall chance to dodge an attack is determined by the [dodge chance](#dodge-chance) statistic.

Dodging is only possible after acquiring the [Evasion](#evasion) skill.

#### Exhaustion

When there is not enough [stamina](#stamina) to pay for an attack, [parry](#parry) or [block](#block), sufficient [stamina regeneration](#stamina-regeneration-rate) must occur first before being able to do any of them.

#### Looting

After the monster is defeated, its remains are looted automatically for any [resources](#resources).

The looted resources can only be collected when the stage is completed, i.e. once the [wilderness](#wilderness) is cleared of monsters.

#### Parry

A successful parry [absorbs](#parry-absorption) a percentage of the total damage of an attack and [reflects](#parry-damage) a percentage back to the attacker. These percentages are determined by the [Finesse](#finesse) mastery rank.

The overall chance to parry an attack is determined by the [parry chance](#parry-chance), which is influenced by currently-equipped gear ([slashing weapons](#slashing-weapon). When parrying occurs, the stamina cost of the currently-equipped weapon is paid. If [exhausted](#exhaustion), no parrying can occur.

Parrying is only possible after acquiring the [Escrime](#escrime) skill.

## Encounter

The main panel to the right of the screen. It changes based on one of the two possible locations, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness stage has a randomly-generated name and contains a certain amount of monsters whose power is determined by the stage and current progress.

The stage is considered completed when the progress is at its maximum after having killed all the monsters. At this point, all [loot](#looting) can be collected and the character can travel to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack the character as soon as it's [engaged](#combat). It has health and a certain attack rate both determined by the current stage.

### Caravan

Encountered after completing the current [wilderness](#wilderness) stage.

All goods and services offered by the caravan crew are purchasable with [coins](#coins), [scrap](#scrap) or [essence](#essence), granting various different bonuses. Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will increase its stage if it was left at its maximum.

The [merchant](#merchant) is always present from the start. Other crew members can be acquired at a cost of coins, who then offer more goods and services. Some have additional requirements before they are unlocked for purchase.

#### Alchemist

Offers conversion of scrap into essence and vice-versa. Buys essence for coins.

#### Blacksmith

Crafts [armor](#armor), [weapons](#weapons) and [shields](#shields). Requires coins as well as scrap.

#### Medic

Offers full healing in exchange for coins. Also sells bandages that stem [bleeding](#bleed) and restore health.

#### Mercenary

Offers acquisition of new [skills](#skills).

#### Merchant

Purchase and sell [items](#item). Coins can then be used to purchase whatever the merchant has available and used for other goods and services of the caravan.

The merchant's inventory of items will grow and diversify after each new stage.

#### Occultist

Offers a reset of all acquired [attribute](#attributes) points in exchange for coins and essence. Also sells soulstones that resurrect the character upon death.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance).

#### Witch

Sells [potions](#potions) in exchange for coins.

## Inventory

The inventory is accessible as soon as the character acquires the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all gear is automatically equipped if possible and all consumables are immediately consumed. Additionally, [encumbrance](#encumbrance) can't be extended via the [tailor](#tailor).

### Item

An item can either be;

- a) a piece of [gear](#gear), or
- b) a consumable like a [potion](#potions), or
- c) a [trinket](#trinkets) that grants a special effect and/or an action.

### Knapsack

Allows for the storage of items. Allows equipping and un-equipping [gear](#gear). Purchasable from the [merchant](#merchant).

### Encumbrance

The inventory size is constrained by encumbrance, to which each carried or equipped item adds a certain amount. No further items can be acquired until the remaining encumbrance allows for it.

Viewing encumbrance and managing it can only be accomplished once the [knapsack](#knapsack) is acquired.

### Gear

Items that can be equipped and unequipped from the inventory.

The [merchant](#merchant) sells one of each gear type of various levels. To acquire improved gear, they need to be crafted by the [blacksmith](#blacksmith).

#### Weapons

Weapons are the main way of fighting monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them.

##### Weapon type

The type of weapon determines how combat occurs.

###### Melee

Standard type that has no special features.

##### Weapon grip

A weapon can either by one-handed or two-handed, taking up the corresponding gear slots when equipped.

###### One-handed

- 1 slot
- Low damage
- High attack rate
- Low stamina requirement

##### Weapon class

Whatever its [type](#weapon-type) or [grip](#weapon-grip), a weapon falls into one of several classes that intrinsically grants certain modifiers. These modifiers are only relevant if the associated [passive skill](#passive-skills) is acquired.

###### Unarmed

No initial modifiers.

###### Blunt weapon

Adds chance to [stagger](#stagger) for a certain duration. Required skill: [Traumatology](#traumatology).

###### Piercing weapon

Chance to inflict [bleed](#bleed). Required skill: [Anatomy](#anatomy).

###### Slashing weapon

Chance to [parry](#parry). Required skill: [Escrime](#escrime).

#### Armor

Armor provides [protection](#protection). When defending, the protection value is subtracted from total damage received.

Each of the following armor classes increases the protection value and adds certain modifiers.

##### No armor

No initial modifiers.

##### Hide armor

- Low protection
- Low cost

##### Reinforced armor

- Medium protection
- Dodging costs stamina
- Low [deflection](#deflection) chance
- Medium cost

##### Plate armor

- High protection
- Cannot dodge
- High deflection chance
- High cost

#### Off-hand

This slot allows the wielding of [shields](#shields).

##### Shields

Grants a percentage [chance to block](#block-chance) all incoming damage. Also grants [stagger chance](#stagger) with the acquisition of the [Traumatology](#traumatology) skill.

###### Small shield

- Low chance to block
- Low stagger chance
- Low stamina cost
- +% [dodge chance](#dodge-chance)
- Low cost

###### Medium shield

- Medium chance to block
- Medium stagger chance
- Low stamina cost
- +% [parry chance](#parry-chance)
- Medium cost

###### Tower shield

- High chance to block
- High stagger chance
- High stamina cost
- +% [protection](#protection)
- High cost

#### Trinkets

Can grant various [buffs](#buffs), actions and other effects if they are carried in the [inventory](#inventory).

The following are some of the early trinkets available from the merchant.

##### Compass

Allows the character to return to any previous stage to hunt more monsters.

##### Hearthstone

Allows the character to return to the caravan regardless of if the current [wilderness](#wilderness) stage's monsters are cleared out or not. Can only be used if not currently attacking (so that the inventory can be opened to use the hearthstone).

### Potions

Purchased from the [witch](#witch).

#### Antidote

Cures and removes [poison](#poison).

#### Elixir

Fully restores [stamina](#stamina). Does not affect [blight](#blight).

#### Salve

Cures and removes [blight](#blight).

## Mastery

Using a particular piece of [gear](#gear) increases its associated mastery based on its type and class, which is determined by ranks. Acquiring a mastery to train requires the acquisition of its associated [skill](#skills).

Each mastery starts at rank 0 and requires a certain amount of accumulated progress before the next rank is achieved.

### Cruelty

Required skill: [Anatomy](#anatomy).

Progress is gained by using [piercing weapons](#piercing-weapon). Each rank increases [bleed damage](#bleed-damage).

### Finesse

Required skill: [Escrime](#escrime).

Progress is gained by using [slashing weapons](#slashing-weapon). Each rank increases [parry absorption](#parry-absorption) & [parry damage](#parry-damage).

### Might

Required skill: [Traumatology](#traumatology).

Progress is gained by using [blunt weapons](#blunt-weapon). Each rank increases [stagger duration](#stagger-duration).

### Stability

Required skill: [Shieldcraft](#shieldcraft).

Progress is gained by successfully [blocking](#block) with [shields](#shields). Each rank reduces the [stamina](#stamina) cost of blocking.

### Resilience

Required skill: [Armorcraft](#armorcraft).

Progress is gained when defending. Each rank reduces [recovery](#recovery-rate) .

## Skills

Skills are acquired from caravan crew and bestow a permanent passive ability.

### Passive skills

Permanent effects that always provide their benefits once they are acquired.

#### Physical (passive)

Skills that unlock certain [attributes](#attributes), [statistics](#statistics) or [masteries](#mastery). Acquired from the [Mercenary](#mercenary).

##### Anatomy

Unlocks [bleed](#bleed) when using [piercing](#piercing-weapon) weapons. Also unlocks the [Cruelty](#cruelty) mastery.

##### Armorcraft

Allows the use and knowledge of [plate](#plate-armor) armor. Also unlocks the [resilience](#resilience) mastery and the [deflection](#deflection) ability.

##### Assassination

Unlocks [dexterity](#dexterity) and [perception](#perception) attributes.

##### Calisthenics

Unlocks the [fortitude](#fortitude) and [vigor](#vigor) attributes.

##### Escrime

Unlocks the ability to [parry](#parry) when using [slashing](#slashing-weapon) weapons. Also unlocks the [Finesse](#finesse) mastery.

##### Evasion

Unlocks [agility](#agility) attribute and [dodge chance](#dodge-chance) modifiers on gear.

##### Shieldcraft

Allows the use and knowledge of [medium](#medium-shield) and [tower](#tower-shield) shields. Also unlocks the [Stability](#stability) mastery.

##### Traumatology

Unlocks the ability to [stagger](#stagger) when using [blunt](#blunt-weapon) weapons and [blocking](#block) with shields. Also unlocks the [Might](#might) mastery.

## Status effects

Temporary or permanent effects granted or changing the current monster or character status.

### Ailments

Negative status effects that dampen the character or monster.

#### Bleed

Certain successful attacks by the character can inflict bleeding on the monster, consisting of a total amount of damage inflicted regularly over a certain period of time.

The statistics [bleed chance](#bleed-chance) and [bleed damage](#bleed-damage) determine this mechanic. Inflicting bleed is only possible after acquiring the [Anatomy](#anatomy) skill.

#### Blight

Blight may be inflicted by a monster if it successfully [poisons](#poison) the character while they are poisoned already, during which maximum [stamina](#stamina) is reduced by a certain percentage. The magnitude of the stamina reduction and chance of inflicting blight is proportional to the wilderness stage in which the monster resides.

Monsters won't exhibit blight until later [wilderness](#wilderness) stages.

This effect can be cured by a [salve](#salve). It can also be avoided if an attack is successfully [deflected](#deflection).

#### Poison

Certain successful attacks by the monster can afflict the character with poison, reducing maximum [health](#health) by a certain percentage. The magnitude of the health reduction and chance of inflicting poison is proportional to the wilderness stage in which the monster resides.

The effect gradually wears off as maximum health is restored over time, during which all healing effects can only restore health up to the currently-reduced maximum.

Monsters won't exhibit poison until later [wilderness](#wilderness) stages. Once poisoned, there is also a chance for certain monsters to inflict [blight](#blight), depending on the stage.

This effect can be cured by an [antidote](#antidote). It can also be avoided if an attack is successfully [deflected](#deflection).

#### Recovery

Recovery occurs when the character is dealt damage, halting regeneration of [reserves](#reserves) and the [attack meter](#attack-rate). Its duration is determined by the [recovery rate](#recovery-rate).

It functions similarly to its counterpart [stagger](#stagger).

#### Stagger

When staggered, the monster will not be able to attack for a certain duration. It functions similarly to its counterpart [recovery](#recovery).

The overall [stagger chance](#stagger-chance) statistic is determined by the current gear ([shields](#shields) and [blunt weapons](#blunt-weapon)). The [stagger duration](#stagger-duration) is determined by the [Might](#might) mastery.

Staggering is only possible after acquiring the [Traumatology](#traumatology) skill.

### Buffs

Temporary or permanent status effects that boost or improve the character or monster that are granted by [trinkets](#trinkets).

## Settings

These are accessible via the "?" menu on the page header. They allow the activation and deactivation of certain global features.

### NSFW mode

Default: off. Toggles the generation of not-safe-for-work words when generating monster and item names.

### Show damage per second (DPS)

Default: off. Toggles DPS information for the character, gear and monster.

### Auto-equip new items

Default: on. Toggles the automatic equipping of weapons, armor, shields and potions once they are acquired. Cannot be set to off until the [knapsack](#knapsack) is acquired.

### Low health warning

Default: on. Toggles a popover warning to prompt a retreat when the character's health drops below 33% of its maximum.

### Show all elements

Default: off. Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and features become relevant. Suitable for veteran players starting a new run.
