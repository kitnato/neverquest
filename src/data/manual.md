# Manual

There are two panels: the [character](#character) (left) and the [encounter](#encounter) (right), with interactions between the two taking place via a column of control buttons in between them.

## Character

The main panel on the left of the UI displays the character's [reserves](#reserves), [statistics](#statistics), [resources](#resources), [ailments](#ailments), and allows setting their name.

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

Collected by [looting](#looting) dead monsters and trading at the [caravan](#caravan).

#### Coins

Gained from selling scrap and [items](#item) to the [merchant](#merchant) and dropped by monsters. Used to pay for [caravan](#caravan) crew, some of their services and any item purchases.

#### Essence

Gained from killing monsters. Primarily spent on acquiring attribute ranks. Essence cost increases for every allocation of an attribute rank.

#### Scrap

Gained by killing monsters. Primarily used to craft [gear](#gear).

### Attributes

For each rank, an attribute provides a direct increasing effect and raises the character's power level by 1.

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

Affects the [rate of attacks](#attack-rate).

#### Strength

Affects [total damage](#total-damage) of an attack.

#### Vigor

Affects [health regeneration rate](#health-regeneration-rate) and [stamina regeneration rate](#stamina-regeneration-rate).

#### Vitality

Affects maximum [total health](#health).

### Statistics

Derived from the character's [attributes](#attributes), [gear](#gear), and any current [ailments](#ailments).

#### Damage per second (DPS)

Displays the expected damage per second (DPS) the character can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical strikes](#critical-chance).

Requires toggling on in the global [settings](#settings) to show.

#### Attack rate

Time duration between attacks, not considering any interruptions such as [recovery](#recovery-rate).

#### Bleed chance

Percentage determining the chance that when attacking, the given [bleed damage](#bleed-damage) of the current weapon's damage is inflicted on the monster over 2.5 seconds.

#### Bleed damage

Percentage of the weapon's total damage that is inflicted over time after a successful attack with bleed. Proportional damage is taken periodically until the duration is complete.

Can be increased by mastering [Cruelty](#cruelty).

#### Block chance

Percentage determining the chance that when defending, all incoming damage is blocked.

Determined by the equipped [shield](#shields).

#### Critical chance

Percentage determining the chance that upon attacking, [critical damage](#critical-damage) is dealt.

Can be increased with the [Dexterity](#dexterity) attribute.

#### Critical damage

Percentage increase of [total damage](#total-damage) dealt when attacking with a [critical strike](#critical-strike).

Can be increased with the [Perception](#perception) attribute.

#### Dodge chance

Percentage determining the chance of when defending, the character avoids all damage entirely.

Can be increased with the [Agility](#agility) attribute.

#### Health regeneration amount

Amount of [health](#health) restored per [regeneration rate](#health-regeneration-rate) period.

Can be increased with the [Vigor](#vigor) attribute.

#### Health regeneration rate

Time duration until [health](#health) is restored by one point.

Can be increased with the [Fortitude](#fortitude) attribute.

#### Parry absorption

Percentage of attacking damage after current [protection](#protection) that is subtracted upon a successful parry.

Can be increased by mastering [Finesse](#finesse).

#### Parry chance

Percentage chance determining a successful [parry](#parry) when defending.

#### Parry damage

Percentage of attacking damage that is inflicted on the attacker upon a successful parry.

Can be increased by mastering [Finesse](#finesse).

#### Protection

Amount of damage that is discarded from the total when defending.

Determined primarily through [armor](#armor).

#### Range

The distance the monster needs to travel once engaged before it can start attacking.

Determined by the currently-equipped [ranged weapon](#ranged-weapons) and affected by the [marksmanship](#marksmanship) mastery.

#### Recovery rate

Time duration until full [recovery](#recovery) from a monster's successful attack.

Can be decreased with the [resilience](#resilience) mastery.

#### Stagger chance

Percentage determining the chance of [staggering](#stagger) the monster when attacking or defending for a certain [duration](#stagger-duration).

Determined by the equipped [gear](#gear) ([shields](#shields) and [blunt weapons](#blunt-weapon)).

#### Stagger duration

Time until the monster recovers from being [staggered](#stagger).

Can be increased by mastering [Might](#might).

#### Stamina regeneration amount

Amount of [stamina](#stamina) restored per [regeneration rate](#stamina-regeneration-rate) period.

Can be increased with the [Vigor](#vigor) attribute.

#### Stamina regeneration rate

Time duration until stamina is restored by a certain amount.

Can be increased with the [Fortitude](#fortitude) attribute.

#### Total damage

Damage from [strength](#strength) in addition to [weapon](#weapons) damage along with any other bonuses that together are applied with every [attack](#combat).

## Encounter

The main panel to the right of the screen. It changes based on one of the two possible locations, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness stage has a randomly-generated name and contains a certain amount of monsters whose power is determined by the stage and current progress.

The stage is considered completed when the progress is at its maximum, which is after having killed all the monsters. At this point, all [loot](#looting) can be collected and the character can travel to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack the character as soon as it's [engaged](#combat). It has health and a certain attack rate both determined by the current stage.

#### Bosses

A boss is a monster that is much more powerful than a standard monster of that stage. They appear every 5 stages, starting at stage 10. It's the only monster on that stage, and once defeated, it drops a [gem](#gems), with one extra gem for every boss above stage 10 (e.g. the boss at stage 25 will drop 4 gems).

### Caravan

Encountered after completing the current [wilderness](#wilderness) stage.

All goods and services offered by the caravan crew are purchasable with [coins](#coins), [scrap](#scrap) or [essence](#essence). Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will increase its stage (if the previous wilderness was left at the maximum stage).

The [merchant](#merchant) is always present from the start. Other crew members can be acquired at a cost of coins, who then offer more goods and services. They become available as the stage increases.

#### Alchemist

Offers conversion of coins, essence, [gems](#gems) and scrap between one another.

#### Blacksmith

Crafts [armor](#armor), [weapons](#weapons) and [shields](#shields). Requires coins as well as scrap.

#### Medic

Offers full healing in exchange for coins. Also sells [bandages](#bandages) that fully restore health.

#### Mercenary

Offers acquisition of new [skills](#skills).

#### Merchant

Purchase and sell [items](#item). Coins are used to purchase whatever the merchant has available.

The merchant's inventory of items will grow and diversify after each new stage.

#### Occultist

Offers a reset of all acquired [attribute](#attributes) points in exchange for coins and essence. Also sells phylacteries that resurrect the character upon death.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance).

#### Witch

Sells [potions](#potions) in exchange for coins.

## Combat

The [wilderness](#wilderness) **stage** initially always has a lurking [monster](#monster). When ready, the character can choose to **attack** continuously based on their [attack rate](#attack-rate), **engaging** the monster in the process. While engaged, the monster will also attack continuously, triggering the character to **defend** themselves. When the monster strikes the character, [recovery](#recovery-rate) is triggered. While recovering, the character won't be able to attack or regenerate their [reserves](#reserves).

Both the character and monster will keep attacking one another until either the character **retreats**, upon which the monster's health instantly regenerates to its maximum, or if the monster or character is dead (one of either's health reaches zero).

Upon a monster's death, the stage's **progress** is incremented, its remains are looted and the next monster is engaged automatically, unless the character retreats.

The character will enter a **resting** state once the stage is complete and there are no more monsters to fight, or when they **travel** to the [caravan](#caravan).

### Block

A successful block by the character upon a monster's attack will negate all damage done, yet costs [stamina](#stamina). Blocking may also inflict [stagger](#stagger) on the monster, depending on the acquisition of the [Traumatology](#traumatology) skill.

The overall chance to block an attack is determined by the [block chance](#block-chance) statistic and is determined primarily by wielding a [shield](#shields).

### Critical strike

An attack might deal extra damage, which is determined by the [chance](#critical-chance) and the overall [damage multiplier](#critical-damage).

Required skill: [Cruelty](#cruelty).

### Deflection

The chance for the character to completely ignore all effects of an incoming [ailment](#ailments).

Required skill: [Armorcraft](#armorcraft).

### Dodge

Dodging an incoming attack negates all damage. It doesn't cost any stamina the way [blocking](#block) does, but only if no [armor](#armor) or [hide](#hide-armor) armor is worn. [Reinforced](#reinforced-armor) armor incurs a stamina cost for dodging, and [plate](#plate-armor) removes the ability to dodge altogether.

The overall chance to dodge an attack is determined by the [dodge chance](#dodge-chance) statistic.

Required skill: [Evasion](#evasion).

### Exhaustion

When there is not enough [stamina](#stamina) to pay for an attack, [parry](#parry) or [block](#block), sufficient [stamina regeneration](#stamina-regeneration-rate) must occur first before being able to do any of them.

### Looting

After the monster is defeated, its remains are looted automatically for any [resources](#resources).

The looted resources can only be collected when the stage is completed, i.e. once the [wilderness](#wilderness) is cleared of monsters.

### Parry

A successful parry [absorbs](#parry-absorption) a percentage of the total damage of an attack and [reflects](#parry-damage) a percentage back to the attacker. These percentages are determined by the [Finesse](#finesse) mastery rank.

The overall chance to parry an attack is determined by the [parry chance](#parry-chance), which is affected by currently-equipped gear ([slashing weapons](#slashing-weapon). When parrying occurs, the stamina cost of the currently-equipped weapon is paid. If [exhausted](#exhaustion), no parrying can occur.

Required skill: [Escrime](#escrime).

## Inventory

The inventory is accessible as soon as the character acquires the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all gear is automatically equipped if possible and [encumbrance](#encumbrance) can't be extended via the [tailor](#tailor).

### Item

An item can either be;

- a) a piece of [gear](#gear), or
- b) a consumable like a [potion](#potions), or
- c) a [trinket](#trinkets) that grants a special effect and/or an action while part of the inventory.

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

Weapons are the main way of fighting monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them.

##### Weapon type

The type of weapon determines how combat occurs.

###### Melee weapons

Close-quarter combat starts the moment the monster is engaged, with either party's [attack rate](#attack-rate) determining the pace of combat.

###### Ranged weapons

All ranged weapons have a certain [range](#range) that determines how long the monster must travel before it can start attacking once it's engaged. Ranged weapons can only be used once the [archery](#archery) skill has been acquired.

##### Weapon grip

A weapon can either by one-handed or two-handed, taking up the corresponding gear slots when equipped.

###### One-handed

- 1 slot
- Low damage
- High attack rate
- Low stamina requirement

###### Two-handed

Takes up both the main and off-hand slots.

- 2 slots
- High damage
- Low attack rate
- High stamina requirement
- Chance to execute monsters at 20% health or under

##### Weapon class

Whatever its [type](#weapon-type) or [grip](#weapon-grip), a weapon falls into one of several classes that intrinsically grants certain modifiers. These modifiers are only relevant if the associated [skill](#skills) is acquired.

###### Unarmed

No initial modifiers.

###### Blunt weapon

Adds chance to [stagger](#stagger) for a certain duration.

Required skill: [Traumatology](#traumatology).

###### Piercing weapon

Chance to inflict [bleed](#bleed).

Required skill: [Anatomy](#anatomy).

###### Slashing weapon

Chance to [parry](#parry).

Required skill: [Escrime](#escrime).

#### Armor

Armor provides [protection](#protection). When defending, the protection value is subtracted from total damage received. When receiving damage, if the armor has thorns, then that damage is simultaneously inflicted upon the attacker.

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

#### Gems

Gems are items that can be applied to gear. They are dropped by [bosses](#bosses), one at stage 10 and one more for each boss encounter after that (resulting in e.g. four gems being dropped by a stage 25 boss).

Up to 5 gems can be applied to a piece of gear. Once applied, gems are consumed and cannot be removed or moved to different gear.

The gem types are the following, associated with their corresponding [elemental types](#elemental-types):

- Ruby (fire)
- Sapphire (ice)
- Topaz (electric)

Gems add the following benefits to gear:

- Armor: adds [thorns](#armor) damage based on protection. If thorns are applied, the corresponding elemental effect is also.
- Weapon: adds damage based on base damage. If an attack hits, the corresponding elemental effect is also applied.
- Shield: increases the potency of the elemental damage and duration of the elemental effect of both armor and weapon gems.

Every applied gem of the same type exponentially increases its corresponding elemental potency.

##### Elemental types

The elemental types are the following, associated with their corresponding effect:

- Fire: inflicts burning effect, taking increased damage
- Ice: inflicts frozen effect, attacking less frequently
- Lightning: inflicts shocked effect, dealing less damage

A monster can be afflicted by any combination of elemental effects, the everity of which is determined how [gems](#gems) are applied to gear.

#### Trinkets

Can enable various actions or grant certain effects if they are carried in the [inventory](#inventory).

The following are some of the early trinkets available from the merchant.

##### Compass

Allows the character to return to any previous stage to hunt more monsters.

##### Hearthstone

Allows the character to return to the caravan regardless of if the current [wilderness](#wilderness) stage's monsters are cleared out or not. Can only be used if not currently attacking (so that the inventory can be opened to use the hearthstone).

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

While present in the [inventory](#inventory), automatically revives the character upon death. The item is consumed in the process.

## Mastery

Using a particular piece of [gear](#gear) increases its associated mastery based on its type and class, determined by its rank. Acquiring a mastery to train requires the acquisition of its associated [skill](#skills).

Each mastery starts at rank 0 and requires a certain amount of accumulated progress before the next rank is achieved.

### Cruelty

Progress is gained by using [piercing weapons](#piercing-weapon). Each rank increases [bleed damage](#bleed-damage).

Required skill: [Anatomy](#anatomy).

### Finesse

Progress is gained by using [slashing weapons](#slashing-weapon). Each rank increases [parry absorption](#parry-absorption) & [parry damage](#parry-damage).

Required skill: [Escrime](#escrime).

### Marksmanship

Progress is gained by using [ranged weapons](#ranged-weapons). Each rank increases [range](#range) and thus distance of the monster when first engaged.

Required skill: [Archery](#archery).

### Might

Progress is gained by using [blunt weapons](#blunt-weapon). Each rank increases [stagger duration](#stagger-duration).

Required skill: [Traumatology](#traumatology).

### Stability

Progress is gained by successfully [blocking](#block) with [shields](#shields). Each rank reduces the [stamina](#stamina) cost of blocking.

Required skill: [Shieldcraft](#shieldcraft).

### Resilience

Progress is gained when defending. Each rank reduces [recovery](#recovery-rate) .

Required skill: [Armorcraft](#armorcraft).

## Skills

Skills are acquired from the [mercenary](#mercenary) and bestow a permanent ability. They can unlock certain [attributes](#attributes), [statistics](#statistics) or [masteries](#mastery).

### Anatomy

Unlocks [bleed](#bleed) when using [piercing](#piercing-weapon) weapons. Also unlocks the [Cruelty](#cruelty) mastery.

### Archery

Allows the use of [ranged weapons](#ranged-weapons). Also unlocks the [marksmanship](#marksmanship) mastery.

### Armorcraft

Allows the use of [plate](#plate-armor) armor. Also unlocks the [resilience](#resilience) mastery and the [deflection](#deflection) ability.

### Assassination

Unlocks [dexterity](#dexterity) and [perception](#perception) attributes.

### Calisthenics

Unlocks the [fortitude](#fortitude) and [vigor](#vigor) attributes.

### Escrime

Unlocks the ability to [parry](#parry) when using [slashing](#slashing-weapon) weapons. Also unlocks the [Finesse](#finesse) mastery.

### Evasion

Unlocks [agility](#agility) attribute and [dodge chance](#dodge-chance) modifiers on gear.

### Siegecraft

Allows the use of [two-handed](#two-handed) weapons.

### Shieldcraft

Allows the use and knowledge of [medium](#medium-shield) and [tower](#tower-shield) shields. Also unlocks the [Stability](#stability) mastery.

### Traumatology

Unlocks the ability to [stagger](#stagger) when using [blunt](#blunt-weapon) weapons and [blocking](#block) with shields. Also unlocks the [Might](#might) mastery.

## Status effects

Temporary or permanent effects influencing the current monster or character status.

### Ailments

Negative status effects that dampen the character or monster.

#### Bleed

Certain successful attacks by the character can inflict bleeding on the monster, consisting of a total amount of damage inflicted regularly over a certain period of time.

This is determined by [bleed chance](#bleed-chance) and [bleed damage](#bleed-damage). Inflicting bleed is only possible after acquiring the [Anatomy](#anatomy) skill.

#### Blight

Blight may be inflicted by a monster if it successfully [poisons](#poison) the character while they are poisoned already, during which maximum [stamina](#stamina) is reduced by a certain percentage. The magnitude of the stamina reduction and chance of inflicting blight is proportional to the wilderness stage in which the monster resides.

Monsters won't exhibit blight until later [wilderness](#wilderness) stages.

This effect can be cured by a [salve](#salve). It can also be avoided if an attack is successfully [deflected](#deflection).

#### Poison

Certain successful attacks by the monster can afflict the character with poison, reducing maximum [health](#health) by a certain percentage. The magnitude of the health reduction and chance of inflicting poison is proportional to the wilderness stage in which the monster resides.

The effect gradually wears off as maximum health is restored over time, during which all healing effects can only restore health up to the currently-reduced maximum.

Monsters won't exhibit poison until later [wilderness](#wilderness) stages. Once poisoned, there is also a chance for certain monsters to inflict [blight](#blight).

This effect can be cured by an [antidote](#antidote). It can also be avoided if an attack is successfully [deflected](#deflection).

#### Recovery

Recovery occurs when the character is dealt damage, halting regeneration of [reserves](#reserves) and the [attack meter](#attack-rate). Its duration is determined by the [recovery rate](#recovery-rate), but only for the character.

It functions similarly to its counterpart [stagger](#stagger).

#### Stagger

When staggered, the monster will not be able to attack for a certain duration. It functions similarly to its counterpart [recovery](#recovery), but only for monsters.

The overall [stagger chance](#stagger-chance) statistic is determined by the current gear ([shields](#shields) and [blunt weapons](#blunt-weapon)). The [stagger duration](#stagger-duration) is determined by the [Might](#might) mastery.

Staggering is only possible after acquiring the [Traumatology](#traumatology) skill.

## Settings

These are accessible via the page header. They allow the activation and deactivation of certain gameplay features.

### Low health warning

Toggles a popover warning to prompt a retreat when the character's [health](#health) drops below 33% of its maximum.

Default: on.

### Confirmation of risky choices

Toggles between hiding and showing modals that confirm certain choices that are seen to be detrimental to gameplay for a beginner, such as leaving the [caravan](#caravan) when not purchasing anything from the [merchant](#merchant) in the first few levels.

Default: on.

### Auto-equip new gear

Toggles the automatic equipping of [weapons](#weapons), [armor](#armor) and [shields](#shields) once they are acquired. Cannot be set to off until the [knapsack](#knapsack) is acquired.

Default: on.

### Show damage per second (DPS)

Toggles DPS displays for the character, weapons and [monster](#monster).

Default: off.

### Show gear comparisons

Toggles icons in the [gear](#gear) details overlays that indicate upgrades or downgrades for each of the properties.

Default: on.

### Show gear level

Toggles between showing and hiding the power level of the gear.

Default: off.

### NSFW mode

Toggles the generation of not-safe-for-work words when generating monster [wilderness](#wilderness) and [item](#item) names.

Default: off.

### Show everything

Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and become relevant. Suitable for veteran players starting a new run.
