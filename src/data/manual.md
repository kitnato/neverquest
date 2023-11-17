# Neverquest

The [wilderness](#wilderness) **stage** initially always has a lurking [monster](#monster). When choosing to **attack**, this is done continuously based on the [attack rate](#attack-rate), **engaging** the monster in the process.

While engaged, the monster will also attack continuously, triggering **defense**. When the monster successfully strikes, [recovery](#recovery-rate) is triggered. While recovering, the character can't attack or regenerate their [reserves](#reserves).

Both the character and monster will keep attacking one another until either the character **retreats**, upon which the monster's health instantly regenerates to its maximum, or if the monster or character is dead (one of either's health reaches zero).

Upon a monster's death, the stage's **progress** is incremented, its remains are looted and the next monster is engaged, unless the character retreats.

After a monster is defeated, its remains are **looted** for [essence](#essence) and any [gems](#gems).

Once the wilderness is cleared of monsters, all looted resources can be **collected** and a **resting** state is entered. At this point, **travel** to the [caravan](#caravan) becomes possible.

The caravan allows interacting with a crew that provides essential services for accessing higher stages and unlocking new capabilities.

## Character

The panel on the left of the screen displays the character's [reserves](#reserves), [statistics](#statistics), [essence](#essence), [ailments](#ailments), and allows setting their name.

### Reserves

Determine the basic status of the character.

#### Health

Total amount of damage the character can take before game over at 0 health.

It is [regenerated](#health-regeneration) over time.

#### Stamina

Several combat actions require stamina to execute them. Most [gear](#gear) has a stamina cost for an associated action. For instance, when wielding a [weapon](#weapons) with a stamina cost, this cost is paid with every attack.

When there is not enough stamina available for an attack, [parry](#parry-rating), [dodge](#dodge-chance) or [block](#block-chance), exhaustion occurs in which none of these actions are possible until sufficient stamina is [regenerated](#stamina-regeneration).

### Essence

Collected by looting dead monsters.

Primarily spent on acquiring attribute ranks. Also used to trade at the [caravan](#caravan). Essence cost increases for every allocation of an attribute rank.

### Attributes

For each rank, an attribute provides a direct increasing effect and raises the character's power level by 1.

[Essence](#essence) is used to allocate ranks. The cost of allocation is increased for every rank.

#### Agility

Affects [dodge chance](#dodge-chance). Requires the [evasion](#evasion) skill.

#### Dexterity

Affects [critical](#critical-rating) chance. Requires the [assassination](#assassination) skill.

#### Endurance

Affects maximum [total stamina](#stamina).

#### Fortitude

Affects [health](#health-regeneration) and [stamina](#stamina-regeneration) regeneration amounts.

#### Perception

Affects [critical](#critical-rating) damage. Requires the [assassination](#assassination) skill.

#### Speed

Affects the [rate](#attack-rate) of attacks.

#### Strength

Affects [total damage](#total-damage) of an attack.

#### Vigor

Affects [health](#health-regeneration) and [stamina](#stamina-regeneration) regeneration rates.

#### Vitality

Affects maximum total [health](#health).

### Statistics

Derived from [attributes](#attributes), [gear](#gear), [skills](#skills), [masteries](#masteries), [traits](#traits) and any current [ailments](#character-ailments).

#### Damage per second (DPS)

Displays the expected damage per second (DPS) the character can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical](#critical-rating) strikes.

Requires toggling on in the global [settings](#settings) to show.

#### Attack rate

Time duration between attacks. Does not take into account triggered [recovery](#recovery-rate).

#### Bleed rating

A value determined by the chance of inflicting [bleed](#bleed) alongside its total damage (as a percentage of weapon damage) and its duration. Only applies if a [piercing](#piercing-weapons) weapon is equipped.

The bleed damage is increased by mastering [cruelty](#cruelty).

Requires the [anatomy](#anatomy) skill.

#### Block chance

Percentage determining the chance that when defending, all incoming damage is negated. Blocking may also inflict [stagger].

Determined by the equipped [shield](#shields).

#### Critical rating

A value determined by the chance that upon attacking, increased (critical) damage is dealt based on a multiplier of current [total damage](#total-damage).

Critical chance can be increased with the [dexterity](#dexterity) attribute and its damage with the [perception](#perception) attribute.

Requires the [assassination](#assassination) skill.

### Deflection chance

The chance for the character to completely ignore all effects of an incoming [ailment](#monster-ailments). Only applies if suitable [armor](#armor) is equipped.

Requires the [armorcraft](#armorcraft) skill.

#### Dodge chance

Percentage determining the chance of when defending, the character avoids all damage entirely. [Reinforced](#reinforced-armor) armor incurs a stamina cost for dodging, and [heavy](#heavy-armor) removes the ability to dodge altogether.

The dodge chance can be increased with the [agility](#agility) attribute.

Requires the [evasion](#evasion) skill.

#### Execution threshold

Percentage determining the amount of monster health required before the next attack will kill it outright. Only applies if a [two-handed](#two-handed) weapon is equipped.

The threshold is increased by mastering [butchery](#butchery).

Requires the [siegecraft](#siegecraft) skill.

#### Health regeneration

Amount of [health](#health) restored according to a certain rate.

The restoration amount can be increased with the [vigor](#vigor) attribute and its rate with the [fortitude](#fortitude) attribute.

Requires the [calisthenics](#calisthenics) skill.

#### Parry rating

A value determined by the chance of successfully parrying when defending, along with the damage that is absorbed (after [protection](#protection)) and reflected back as a result. Only applies if a [slashing](#slashing-weapons) weapon is equipped.

The absorbed & reflected damage is increased by mastering [finesse](#finesse).

Requires the [escrime](#escrime) skill.

#### Protection

Amount of damage that is discarded from the total incoming damage when defending.

Determined primarily through [armor](#armor).

#### Range

The distance the monster needs to travel once engaged before it can start attacking.

Determined by the equipped [ranged weapon](#ranged-weapons) and affected by the [marksmanship](#marksmanship) mastery.

Requires the [archery](#archery) skill.

#### Recovery rate

Time duration until full [recovery](#recovery) from a monster's successful attack.

Can be decreased by mastering [resilience](#resilience).

Requires the [armorcraft](#armorcraft) skill.

#### Stagger rating

A value determined by the chance to [stagger](#stagger)and its duration. Only applies if an appropriate [offhand](#offhand) is equipped.

The stagger duration can be increased by mastering [stability](#stability).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stun rating

A value determined by the chance to [stun](#stun) and its length. Only applies if an appropriate [blunt](#blunt-weapons) weapon is equipped.

The stun length can be increased by mastering [might](#might).

Requires the [traumatology](#traumatology) skill.

#### Stamina regeneration

Amount of [stamina](#stamina) restored according to a certain rate.

The restoration amount can be increased with the [vigor](#vigor) attribute and its rate with the [fortitude](#fortitude) attribute.

Requires the [calisthenics](#calisthenics) skill.

#### Total damage

Damage from the equipped [weapon](#weapons) in addition to [strength](#strength) along with any other bonuses that together are inflicted with every attack.

## Encounter

The panel to the right of the screen. It changes based on one of the two possible locations, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness stage has a randomly-generated name and contains a certain amount of monsters whose power is determined by the stage and current progress.

The stage is considered completed when the progress is at its maximum, which is after having killed all the monsters. At this point, all loot can be collected and the character can travel to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack the character as soon as it's engaged. It has health and a certain attack rate both determined by the current stage.

#### Bosses

A boss is a monster that is much more powerful than a standard monster of that stage. They appear every 5 stages, starting at stage 10. It's the only monster on that stage, and once defeated, it drops a [gem](#gems), with one extra gem for every boss above stage 10 (e.g. the boss at stage 25 will drop 4 gems).

### Caravan

Encountered after completing the current [wilderness](#wilderness) stage.

All goods and services offered by the caravan crew are purchasable with [essence](#essence). Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will increase its stage (if the previous wilderness was left at the maximum stage).

The [merchant](#merchant) is always present from the start. Other crew members can be acquired at a cost of essence, who then offer more goods and services. They become available as the stage increases.

#### Alchemist

Offers conversion of [gems](#gems) between one another.

#### Blacksmith

Crafts [armor](#armor), [weapons](#weapons) and [shields](#shields). Requires essence.

#### Medic

Offers full healing in exchange for essence. Also sells [bandages](#bandages) that fully restore health.

#### Mercenary

Offers acquisition of new [skills](#skills).

#### Merchant

Purchase and sell [items](#item). [Essence](#essence) is used to purchase whatever the merchant has available.

The merchant's inventory of items will grow and diversify after each new stage.

#### Occultist

Offers a reset of all acquired [attribute](#attributes) points in exchange for essence. Also sells phylacteries that resurrect the character upon death.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance).

#### Witch

Sells [potions](#potions) in exchange for essence.

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

Takes up both the main and offhand slots.

- 2 slots
- High damage
- Low attack rate
- High stamina requirement
- Chance to execute monsters at 20% health or under

##### Weapon class

Whatever its [type](#weapon-type) or [grip](#weapon-grip), a weapon falls into one of several classes that intrinsically grants certain modifiers. These modifiers are only relevant if the associated [skill](#skills) is acquired.

###### Unarmed

No initial modifiers.

###### Blunt weapons

Adds chance to [stun](#stun) for a certain duration.

Requires the [traumatology](#traumatology) skill.

###### Piercing weapons

Chance to inflict [bleed](#bleed).

Requires the [anatomy](#anatomy) skill.

###### Slashing weapons

Chance to [parry](#parry-rating).

Requires the [escrime](#escrime) skill.

#### Armor

Armor provides [protection](#protection). When defending, the protection value is subtracted from total damage received. When receiving damage, if the armor has thorns, then that damage is simultaneously inflicted upon the attacker.

Each of the following armor classes increases the protection value and adds certain modifiers.

##### No armor

No initial modifiers.

##### Light armor

- Low protection
- Low purchase & crafting cost

##### Reinforced armor

- Medium protection
- Dodging costs stamina
- Low [deflection](#deflection-chance) chance
- Medium purchase & crafting cost

##### Heavy armor

- High protection
- Cannot dodge
- High deflection chance
- High purchase & crafting cost

#### Offhand

This slot allows the wielding of [shields](#shields).

##### Shields

Grants a percentage chance to [block](#block-chance) all incoming damage. Also grants [stagger chance](#stagger) with the acquisition of the [Traumatology](#traumatology) skill.

###### Small shields

- Low chance to block
- Low stagger chance
- Low purchase & crafting cost

###### Medium shields

- Medium chance to block
- Medium stagger chance
- Low stamina cost
- Medium purchase & crafting cost

###### Tower shields

- High chance to block
- High stagger chance
- High stamina cost
- High purchase & crafting cost

#### Gems

Gems are items that can be applied to gear. They are dropped by [bosses](#bosses), one at stage 10 and one more for each boss encounter after that (resulting in e.g. four gems being dropped by a stage 25 boss).

Up to 5 gems can be applied to a piece of gear. Once applied, gems are consumed and cannot be removed or moved to different gear.

The gem types are the following, associated with their corresponding [elemental damage](#elemental-damage) types:

- Ruby (fire)
- Sapphire (ice)
- Topaz (electric)

Gems add the following benefits to gear:

- Armor: adds [thorns](#armor) damage based on protection. If thorns are applied, the corresponding elemental effect is also.
- Weapon: adds damage based on base damage. If an attack hits, the corresponding elemental effect is also applied.
- Shield: increases the potency of the elemental damage and duration of the elemental effect of both armor and weapon gems.

Every applied gem of the same type exponentially increases its corresponding elemental potency.

##### Elemental damage

The elemental damage types are the following, associated with their corresponding effect:

- Fire inflicts [burning](#burning).
- Ice inflicts [frozen](#frozen).
- Lightning inflicts [shocked](#shocked).

A monster can be afflicted by any combination of elemental effects, the severity of which determined by how many gems are applied to gear.

#### Trinkets

Enable various actions or grant certain effects if they are carried in the [inventory](#inventory).

##### Static trinkets

These provide a permanent effect of some sort while they are carried in the inventory. If one is sold or lost, the effect disappears alongside it.

##### Usable trinkets

In addition to potentially providing a [static](#static-trinkets) effect, these trinkets also allow direct interaction, usually granting a new action.

##### Infusable trinkets

Some of usable trinkets are infusable, meaning they allow [essence](#essence) to be spent on them to upgrade their effect.

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

## Masteries

The panel on the left under the [character](#character).

Using a particular piece of [gear](#gear) increases its associated mastery based on its type and class, determined by its rank. Acquiring a mastery to train requires the acquisition of its associated [skill](#skills).

Each mastery starts at rank 0 and requires a certain amount of accumulated progress before the next rank is achieved.

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

### Shieldcraft

Unlocks the use of [tower](#tower-shields) shields alongside the ability to [stagger](#stagger) monsters. Also unlocks the [stability](#stability) mastery.

### Traumatology

Unlocks the ability to [stun](#stun) when attacking with [blunt](#blunt-weapons) weapons. Also unlocks the [might](#might) mastery.

## Ailments

Temporary, negative status effects that can afflict the character or monster.

### Character ailments

Ailments that are inflicted by monsters when defending.

#### Blight

Blight may be inflicted by a monster if it successfully [poisons](#poison) the character while they are poisoned already, during which maximum [stamina](#stamina) is reduced by a certain percentage. The magnitude of the stamina reduction and chance of inflicting blight is proportional to the wilderness stage in which the monster resides.

Monsters won't exhibit blight until later [wilderness](#wilderness) stages.

This effect can be cured by a [salve](#salve). It can also be avoided if an attack is successfully [deflected](#deflection-chance).

#### Poison

Certain successful attacks by the monster can afflict the character with poison, reducing maximum [health](#health) by a certain percentage. The magnitude of the health reduction and chance of inflicting poison is proportional to the wilderness stage in which the monster resides.

The effect gradually wears off as maximum health is restored over time, during which all healing effects can only restore health up to the currently-reduced maximum.

Monsters won't exhibit poison until later [wilderness](#wilderness) stages. Once poisoned, there is also a chance for certain monsters to inflict [blight](#blight).

This effect can be cured by an [antidote](#antidote). It can also be avoided if an attack is successfully [deflected](#deflection-chance).

#### Recovery

Recovery occurs when damage is dealt, halting regeneration of [reserves](#reserves) and any [attack](#attack-rate) progress. Its duration is determined by the [recovery rate](#recovery-rate).

### Monster ailments

Ailments that are inflicted by the character when attacking.

#### Bleed

Certain successful attacks with a [piercing](#piercing-weapons) weapon can inflict bleeding on the monster, consisting of a proportional amount of damage inflicted regularly over a certain period of time. The extent of this is determined by the [bleed-rating](#bleed-rating).

Requires the [anatomy](#anatomy) skill.

#### Burning

Inflicted by fire [elemental](#elemental-damage) damage. When burning, damage taken is increased.

#### Frozen

Inflicted by ice [elemental](#elemental-damage) damage. When frozen, attack rate is reduced.

#### Shocked

Inflicted by lightning [elemental](#elemental-damage) damage. When shocked, damage dealt is reduced.

#### Stagger

When staggered, the monster's attack rate and movement speed (time to close [distance](#range)) is slowed. The extent of this is determined by the [stagger rating](#stagger-rating).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stun

When stunned, the monster's hit accuracy is reduced for a certain number of attacks (its length), meaning it may miss completely. The extent of this is determined by the [stun rating](#stun-rating).

Requires the [traumatology](#traumatology) skill.

## Retirement

When reaching a certain stage, retirement is unlocked. This restarts the quest from stage 1 with power level 0, no essence, no skills, no gear and all masteries at rank 0. All hired caravan crew are retained, however. A [trait](#traits) can be also chosen that confers a permanent bonus.

### Traits

Traits are permanent passive abilities acquired upon [retiring](#retirement) for all subsequent new quests. One may be chosen at a time for every retirement.

#### Brawler

Being unshielded doubles one-handed damage.

#### Bruiser

Current stamina adds unarmed bonus damage & unarmed attacks have a chance to [stun](#stun). Requires [traumatology](#traumatology) skill for stun as normal.

#### Colossus

[Two-handed](#two-handed) weapons can be equipped alongside a [shield](#shields).

#### Executioner

[Critical](#critical-rating) strikes with a two-handed weapon always execute the monster (killing it outright).

#### Field surgeon

Health is fully restored when not in combat.

#### Inoculated

[Deflection](#deflection-chance) chance is doubled.

#### Ninja

Monsters are looted immediately.

#### Nudist

[Dodge](#dodge-chance) rate is doubled when not wearing any armor.

#### Sharpshooter

While [distant](#range), all attacks with a [ranged](#ranged-weapons) weapon are critical strikes.

#### Shredder

[Bleed](#bleed) damage is inflicted all at once (instead of being evenly spread over a certain duration).

#### Stalwart

There are no penalties when wearing armor.

#### Tank

Having a shield equipped doubles total [protection](#protection).

#### Tormentor

Monsters can no longer regenerate.

### Quests

Quests are similar to achievements in that they have a set of requirements and progress based on certain gameplay actions and states. They are unlocked only once the journal [trinket](#usable-trinkets) is acquired, then going into [retirement](#retirement). Once a quest's requirements are achieved, it can be completed by choosing a permanent bonus to either [health](#health), [stamina](#stamina) or [total damage](#total-damage) that persists through retirement and while the journal is in the inventory.

They are categorized into the following:

#### Conquests

Tracks combat-based activities.

#### Routines

Tracks all non-combat-related activities.

#### Triumphs

A collection of challenges and hard-to-reach goals.

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

### Allow profanity

Toggles the generation of not-safe-for-work words when generating [monster](#monster), [wilderness](#wilderness) and [item](#item) names.

Default: on.

### Show everything

Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and become relevant. Suitable for veteran players starting a new run.

## Roadmap

Neverquest is a work-in-progress. Several features are pending ideation, refinement and implementation.

### Activated skills

Once acquired, activating a skill requires [energy](#energy).

#### Auras

Cast spells that remain active until dispelled. Provides an effect in return for reserving a percentage of energy.

#### Physical (activated)

Combat skills that can be activated during combat. Acquired from the [Mercenary](#mercenary).

#### Sorceries

Cast spells with immediate and/or over-time effects. Acquired from the [sorcerer](#sorcerer).

### Energy

A [reserve](#reserves), Consumed when activating [skills](#skills), [auras](#auras) and [sorceries](#sorceries), regenerated over time.

### New attributes

#### Acumen

Affects [sorcery](#sorceries) casting rate.

#### Intellect

Affects energy regeneration rate.

#### Wisdom

Affects total [energy](#energy).

### New caravan crew

Along with two more additional hires, the entire crew dialog system needs to be overhauled and expanded to allow for better storytelling and immersion.

#### Cook

Sells hot meals that restore all [energy](#energy) when used.

Grants a Well Fed bonus for the next stage (+25% [mastery](#masteries) gain).

#### Sorcerer

Acquire [sorceries](#sorceries) and [auras](#auras).

### Log

A toggle-able UI element that displays all stateful activities in real-time, e.g. combat details, transactions etc.

### Venom

A [potion](#potions), that once applied to a weapon, it adds an effect with each strike, applying damage-over-time effects and potentially other ailments. Has a certain number of charges before it is used up.
