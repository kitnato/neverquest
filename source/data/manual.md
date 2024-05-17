# neverquest

_An irreverent text-based incremental action role-playing game._

> This manual has content spoilers.

## Gameplay

The [wilderness](#wilderness) **stage** initially harbors a lurking [monster](#monster). Choosing to **attack** does so continuously based on your [attack rate](#attack-rate), **engaging** the monster in the process.

While engaged, the monster attacks continuously, triggering your **defense**. When the monster successfully strikes, [recovery](#recovery-rate) is triggered. While recovering, you can't attack or regenerate your [reserves](#reserves).

Both you and monster keep attacking one another until either you **retreat**, or either one of you dies (health reaches zero). Retreating disengages all combat until you choose to attack again.

Upon a monster's death, the stage's **progress** is incremented, its remains are **looted** for [essence](#essence) and any [items](#items) and the next monster is engaged immediately, unless you retreat. Beware of the powerful [boss monsters](#boss) that lurk at regular stage intervals.

Once the wilderness is cleared of monsters, all looted resources can be **collected** and you enter a **resting** state. At this point, **traveling** to the [caravan](#caravan) becomes possible.

The caravan allows interacting with crew members that each provide essential goods & services that help you progress through the stages and unlock new capabilities. [Death](#death) is but a temporary setback and, eventually, **retiring** allows for a [fresh start](#retirement) with mighty bonuses.

Stages can increase indefinitely and there are many secrets to uncover and foes to conquer. Will you be able to piece together the true ending?

## You

Your [reserves](#reserves), [statistics](#statistics), [essence](#essence), [ailments](#ailments), and your name, should you choose one.

### Reserves

Determines your basic status.

#### Health

Total amount of damage you can take before [flatlining](#death) at 0 health.

Health is [regenerated](#health-regeneration) over time.

Monsters also have health that functions in the same way.

#### Stamina

Several combat actions require stamina to be able to accomplish them. Most [gear](#gear) has a burden for an associated action which translates to a stamina cost that must be paid.

Every attack with a [weapon](#weapons) costs stamina, determined by its burden. Similarly, wearing [armor](#armor) incurs a burden that is paid when being struck or [dodging](#dodge-chance) and [shields](#shields) incur their own burden whenever an attack is [blocked](#block-chance) or the monster is [staggered](#staggered).

When there is not enough stamina available for a particular action, you become exhausted during which none of these actions are possible until sufficient stamina is [regenerated](#stamina-regeneration).

### Essence

Collected by looting dead monsters.

Primarily spent on acquiring attribute ranks. Essence cost increases for every allocation of an attribute rank. Also used to trade at the [caravan](#caravan) and pay for socketing [gems](#gems) and relic [infusions](#infusable-relics).

### Attributes

For each of its ranks, an attribute provides an increasingly powerful effect and raises your power level by 1.

[Essence](#essence) is used to allocate attribute ranks. This allocation cost is increased for every attribute based on your power.

#### Agility

Affects [dodge chance](#dodge-chance). Requires the [evasion](#evasion) skill.

#### Dexterity

Affects [critical](#critical-rating) chance. Requires the [assassination](#assassination) skill.

#### Endurance

Affects maximum [total stamina](#stamina).

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

#### Damage per second

Displays the expected damage per second you (and the monster) can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical](#critical-rating) strikes.

Requires the acquisition of a certain [relic](#relics).

#### Attack rate

The time duration between attacks. Does not take into account [recovery rate](#recovery-rate).

#### Bleed rating

A value determined by:

- the chance of inflicting [bleeding](#bleeding),
- its associated total bleeding damage, which is a percentage of weapon damage,
- and the bleeding duration.

Only applies if a [piercing](#piercing-weapons) weapon is equipped.

Bleeding damage is increased by mastering [cruelty](#cruelty).

Requires the [anatomy](#anatomy) skill.

#### Block chance

A percentage determining the chance that when defending, all incoming damage is avoided. Blocking an attack does not trigger [recovery](#recovery).

Determined by the equipped [shield](#shields).

#### Critical rating

A value determined by the chance that upon attacking, increased (critical) damage is dealt based on a multiplier of current [total damage](#total-damage).

Critical chance can be increased with the [dexterity](#dexterity) attribute and its damage with the [perception](#perception) attribute.

Requires the [assassination](#assassination) skill.

### Deflection chance

A percentage chance for you to completely ignore all effects of an incoming [ailment](#character-ailments). Primarily determined by the equipped [armor](#armor).

Requires a certain [skill](#skills).

#### Dodge chance

A percentage determining the chance of when being struck, that all damage is avoided entirely. The equipped armor's [burden](#armor) incurs a stamina cost if an attack is dodged successfully. Dodging is different from other damage-mitigating actions such as [blocking](#block-chance) and [parrying](#parry-rating) in that it avoids the infliction of any [ailments](#character-ailments) altogether.

Dodge chance can be increased with the [agility](#agility) attribute.

Requires the [evasion](#evasion) skill.

#### Execution threshold

A percentage determining the amount of monster health required before the next attack will kill it outright. Only applies if a [two-handed](#two-handed) weapon is equipped.

This threshold is increased by mastering [butchery](#butchery).

Requires the [siegecraft](#siegecraft) skill.

#### Health regeneration

The amount of [health](#health) restored according to a cyclical rate.

The restoration amount per cycle is a small percentage of maximum health. The rate can be increased with the [vigor](#vigor) attribute.

#### Parry rating

A value determined by the chance of successfully parrying when defending, along with the damage that is absorbed (after [protection](#protection)) and reflected back. Only occurs if a [slashing](#slashing-weapons) weapon is equipped.

The absorbed and reflected damage is increased by mastering [finesse](#finesse).

Requires the [escrime](#escrime) skill.

#### Protection

The amount of damage that is discarded from the total incoming damage when defending.

Determined primarily through [armor](#armor).

#### Range

The distance the monster needs to travel once it's engaged before it can start attacking. Only applies if a [ranged weapon](#ranged-weapons) is equipped.

Determined by the equipped ranged weapon and can be increased by mastering [marksmanship](#marksmanship).

Requires the [archery](#archery) skill.

#### Recovery rate

The time duration until full [recovery](#recovery) from a monster's successful attack that is neither [blocked](#block-chance), [parried](#parry-rating) or [staggered](#stagger-rating).

Can be decreased by mastering [resilience](#resilience).

#### Stagger rating

A value determined by the chance to [stagger](#staggered) and the stagger duration. Only applies if a [shield](#shields) is equipped.

The stagger duration can be increased by mastering [stability](#stability).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stun rating

A value determined by the chance to [stun](#stunned) and the stun duration. Only applies if a [blunt](#blunt-weapons) weapon is equipped.

The stun duration can be increased by mastering [might](#might).

Requires the [traumatology](#traumatology) skill.

#### Stamina regeneration

The amount of [stamina](#stamina) restored according to a certain rate.

The restoration amount per cycle is a small percentage of maximum stamina. The rate can be increased with the [vigor](#vigor) attribute.

#### Total damage

Damage from the equipped [weapon](#weapons) in addition to [strength](#strength) and socketed [gems](#gems), along with any other bonuses that together are inflicted with every attack.

### Death

When your [health](#health) reaches 0, you flatline and are reborn a stage lower with your [items](#items) and [power level](#attributes) intact, but having lost all unspent [essence](#essence). Upon reaching the stage again in which you died, you may scavenge your corpse to recover some of the lost essence.

All [equipped relics](#usable-relics) will need to be re-equipped.

If carrying a [phylactery](#phylactery), you may instantly resurrect where you died without any penalties.

## Encounter

The panel to the right of the screen. It changes based on one of the two possible locations, [wilderness](#wilderness) or [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness stage has a unique, randomly-generated name and contains a certain amount of monsters whose abilities are determined by the stage and your current progress in it.

The stage is considered completed when the progress is at its maximum, which is after having killed all the monsters. At this point, all loot can be collected and you can travel to the [caravan](#caravan).

### Monster

A creature with a unique, randomly generated name that continuously attacks you as soon as it's engaged. It has health and a certain attack rate both determined by the current stage. It can both [inflict](#character-ailments) and [receive](#monster-ailments) several ailments.

In later stages, rage can build up when retreating, which eventually frenzies the monster permanently into attacking a lot faster.

#### Boss

A monster that is more powerful than a standard monster would otherwise be on that stage. They appear every few stages. It's the only monster on that stage, and once defeated, it drops [gems](#gems) and under special circumstances it may also drop a [relic](#relics).

### Caravan

Encountered after completing the current [wilderness](#wilderness) stage.

All goods and services offered by caravan crew members are purchasable with [essence](#essence). Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which increases the stage if the previous wilderness was completed at its highest.

The [merchant](#merchant) is always present from the start. Other crew members can be hired at a cost of essence, who in turn offer different goods and services. More crew members become available for hire as the maximum stage increases.

#### Alchemist

Offers conversion of [gems](#gems) between one another. Also offers special training under certain circumstances.

#### Blacksmith

Crafts [armor](#armor), [melee weapons](#melee-weapons) and [shields](#shields).

#### Fletcher

Crafts [ranged weapons](#ranged-weapons) as well as their munitions.

Requires the [archery](#archery) skill.

#### Medic

Offers full healing & stamina recovery in exchange for essence. Also sells [bandages](#bandages) that fully restore health.

#### Mercenary

Offers training of new [skills](#skills).

#### Merchant

Sells new [items](#items) and purchases your unwanted ones. The merchant's inventory of items grows and diversifies after each new stage.

#### Occultist

Offers purging rituals, such as resetting your [power level](#attributes) that refunds all spent essence. Also sells phylacteries that resurrect you upon [death](#death) and offers special training under certain circumstances.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance).

#### Witch

Sells [potions](#potions) in exchange for essence. Also offers special training under certain circumstances.

## Inventory

The inventory is accessible as soon as you acquire the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all gear is automatically equipped if possible and [encumbrance](#encumbrance) can't be extended via the [tailor](#tailor).

### Items

An item can either be;

- a) a piece of [gear](#gear), or
- b) a consumable like a [potion](#potions), or
- c) a [relic](#relics) that grants a special effect and/or a manual action while carried.

Every item, apart from the [knapsack](#knapsack), has an associated weight that affects [encumbrance](#encumbrance). Any item can also be discarded, thereby irretrievably removing it from the inventory.

### Knapsack

Allows for the storage of items. Allows equipping and un-equipping [gear](#gear). Purchasable from the [merchant](#merchant).

### Encumbrance

Inventory size is constrained by encumbrance, to which each carried or equipped item adds a certain amount based on its weight. No further items can be acquired until the remaining encumbrance allows for it.

Viewing encumbrance and managing it can only be accomplished once the [knapsack](#knapsack) is acquired.

### Gear

Items that can be equipped and unequipped from the [inventory](#inventory).

If gear has been equipped, all subsequent pieces of gear in the inventory will show indicators for their individual effects when compared to what is currently equipped. The indicators will either show that an effect is higher (up arrow), lower (down arrow) and simultaneously if that makes it worse (red) or better (green) than what is currently in the equipment slot. If it's the same effect, then the comparison is a grey diamond shape.

The [merchant](#merchant) sells one of each gear type of various levels. To acquire improved gear, they need to be crafted by the [blacksmith](#blacksmith).

#### Weapons

Weapons allow you to fight monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them.

An equipped weapon's burden determines how much [stamina](#stamina) is expended whenever an attack is made.

##### Melee weapons

Close-quarter combat starts the moment the monster is engaged, with either party's [attack rate](#attack-rate) determining the pace of combat. "2 slots" means the weapon cannot normally be wielded alongside a [shield](#shields).

###### One-handed

- 1 slot
- Low damage
- Low attack rate
- Medium burden
- Low purchase and crafting cost
- Low weight

###### Two-handed

- 2 slot
- High damage
- High attack rate
- High burden
- High purchase and crafting cost
- High weight

Also provides a chance to [execute](#execution-threshold) monsters when at or under a certain health threshold or under.

##### Ranged weapons

- 2 slots
- Medium damage
- Medium attack rate
- Low burden
- Medium purchase and crafting cost
- Medium weight

Also provides a certain [range](#range) that delays contact with the monster.

Requires the [archery](#archery) skill. Also requires munitions, which can be crafted by the [fletcher](#fletcher). Munition storage must first be procured from the [merchant](#merchant).

##### Weapon class

Whatever melee or ranged, a weapon additionally falls into one of several classes that grants certain modifiers. These modifiers are only applied if the associated [skill](#skills) is acquired.

###### Blunt weapons

Adds chance to [stun](#stunned) for a certain duration. Being unarmed is considered as wielding a blunt weapon.

Stun requires the [traumatology](#traumatology) skill.

###### Piercing weapons

Chance to inflict [bleeding](#bleeding).

Bleeding requires the [anatomy](#anatomy) skill.

###### Slashing weapons

Chance to [parry](#parry-rating). [Ranged weapons](#ranged-weapons) cannot be in this class.

Parry requires the [escrime](#escrime) skill.

#### Armor

Armor provides [protection](#protection), but is burdensome. This burden is paid in stamina whenever you are struck or when [dodging](#dodge-chance). When receiving damage, if the armor has [thorns](#gems), then that damage is simultaneously inflicted upon the monster.

Each of the following armor classes increases the protection value for certain tradeoffs.

##### Light armor

- Low protection
- High [deflection](#deflection-chance) chance
- Low burden
- Low purchase and crafting cost

##### Reinforced armor

- Medium protection
- Medium deflection chance
- Medium burden
- Medium purchase and crafting cost

##### Heavy armor

- High protection
- Low deflection chance
- High burden
- High purchase and crafting cost

#### Shields

Grants a percentage chance to [block](#block-chance) all incoming damage. May also grant a [stagger chance](#staggered) with the acquisition of the [Traumatology](#traumatology) skill.

A shield's burden is paid in [stamina](#stamina) every time you successfully block or stagger.

##### Small shields

- Low chance to block
- High stagger chance
- Low burden
- Low purchase and crafting cost

##### Medium shields

- Medium chance to block
- Medium stagger chance
- Medium burden
- Medium purchase and crafting cost

##### Tower shields

- High chance to block
- Low stagger chance
- High burden
- High purchase and crafting cost

#### Gems

Gems are items that can be socketed into gear. They are dropped by [bosses](#boss), and more are dropped per boss additional the higher the wilderness [stage](#wilderness) is. If a boss has already been defeated on a particular stage, visiting it again will drastically reduce the chance to drop any gems.

Only a certain amount of gems can be applied to a piece of gear. Once applied, gems cannot be removed or transferred to a different piece of gear.

The gem types are the following, associated with their corresponding [elemental damage](#elemental-damage) types:

- Amethyst (lightning)
- Ruby (fire)
- Sapphire (ice)

Gems add the following effects to gear:

- Weapon: adds damage bonus based on weapon damage. Once an attack hits the monster, the corresponding elemental effect is also applied.
- Armor: adds [thorns](#armor) damage based on armor gear level. Once thorns are inflicted, the corresponding elemental effect is applied as well.
- Shield: increases the potency of the elemental damage and duration of the elemental effect of both armor and weapon gems of the same type.

Every applied gem of the same type to the same piece of gear increases its corresponding effect.

##### Elemental damage

The elemental damage types are the following, associated with their corresponding ailment:

- Fire inflicts [burning](#burning).
- Ice inflicts [frozen](#frozen).
- Lightning inflicts [shocked](#shocked).

A monster can be afflicted by any combination of elemental ailment.

#### Relics

Relics enable various actions or grant certain effects if they are carried in the [inventory](#inventory). They can be purchased from the [caravan](#caravan) and certain relics drop from monsters, under the right circumstances.

##### Static relics

Provide a permanent effect of some sort while they are carried in the inventory. If such a relic is sold or discarded, the effect disappears with it.

##### Usable relics

Relics that can be interacted with. Some can be equipped for their effect to be granted.

##### Infusable relics

Some usable relics are infusable, meaning they allow [essence](#essence) to be spent on them to upgrade their effect via infusion levels. This can only be done once a certain [skill](#skills) has been acquired.

To infuse continuously, the button can be held down so as to not require excessive clicking.

### Consumables

A single-use item. [Gems](#gems) are also consumable items.

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

While present in the [inventory](#inventory), gives you the option of resurrecting upon [death](#death) without losing essence or progress. The item is consumed in the process.

## Masteries

Using a particular piece of [gear](#gear) trains and increases its associated mastery. Acquiring a mastery to train requires the acquisition of its associated [skill](#skills).

Each mastery starts at rank 0 and requires a certain amount of accumulated training progress before the next rank is achieved.

### Butchery

Each rank increases the [execution](#execution-threshold) threshold. Progress is gained by using [two-handed](#two-handed) weapons.

Requires the [siegecraft](#siegecraft) skill.

### Cruelty

Each rank increases [bleeding](#bleeding) damage. Progress is gained by using [piercing](#piercing-weapons) weapons.

Requires the [anatomy](#anatomy) skill.

### Finesse

Each rank increases [parry](#parry-rating) and damage. Progress is gained by using [slashing](#slashing-weapons) weapons.

Requires the [escrime](#escrime) skill.

### Marksmanship

Each rank increases [range](#range) and thus distance of the monster it's when first engaged. Progress is gained by using [ranged weapons](#ranged-weapons).

Requires the [archery](#archery) skill.

### Might

Each rank increases how many of its attacks the monster is [stunned](#stunned) for. Progress is gained by using [blunt](#blunt-weapons) weapons.

Requires the [traumatology](#traumatology) skill.

### Stability

Each rank increases the [stagger](#staggered) duration. Progress is gained when losing health as a result of being struck while having a [shield](#shields) equipped, or by [blocking](#block-chance).

Requires the [shieldcraft](#shieldcraft) skill.

### Resilience

Each rank reduces [recovery](#recovery-rate). Progress is gained when losing health as a result of being struck.

Requires the [armorcraft](#armorcraft) skill.

## Skills

Skills are acquired primarily from the [mercenary](#mercenary) and bestow a permanent ability. They can unlock certain [attributes](#attributes), [statistics](#statistics) and [masteries](#masteries).

Some skills are also trained by other crew members, but have special requirements before they can be acquired.

### Anatomy

Unlocks the ability to inflict [bleeding](#bleeding) when using [piercing](#piercing-weapons) weapons. Also unlocks the [Cruelty](#cruelty) mastery.

### Archery

Allows the use of [ranged weapons](#ranged-weapons). Also unlocks the [marksmanship](#marksmanship) mastery.

### Armorcraft

Allows the use of [heavy armor](#heavy-armor). Also unlocks the [resilience](#resilience) mastery.

### Assassination

Unlocks the [dexterity](#dexterity) and [perception](#perception) attributes.

### Calisthenics

Unlocks the [vigor](#vigor) attribute.

### Escrime

Unlocks the ability to [parry](#parry-rating) when using [slashing](#slashing-weapons) weapons. Also unlocks the [finesse](#finesse) mastery.

### Evasion

Unlocks the [agility](#agility) attribute.

### Siegecraft

Unlocks the use of [two-handed](#two-handed) weapons that have a chance to [execute](#execution-threshold).

Requires hiring the [blacksmith](#blacksmith).

### Shieldcraft

Unlocks the use of [tower](#tower-shields) shields alongside the ability to [stagger](#staggered) monsters. Also unlocks the [stability](#stability) mastery.

Requires hiring the [blacksmith](#blacksmith).

### Traumatology

Unlocks the ability to [stun](#stunned) when attacking with [blunt](#blunt-weapons) weapons. Also unlocks the [might](#might) mastery.

## Ailments

Temporary, negative status effects that can afflict you or the monster.

### Character ailments

Ailments that are inflicted by monsters when defending. Ailments can only be avoided if they're [deflected](#deflection-chance) or the attack is [dodged](#dodge-chance).

#### Blight

Blight can be inflicted by a monster while you are [poisoned](#poison) already, during which maximum [stamina](#stamina) is reduced by a certain percentage. The magnitude of the stamina reduction and chance of inflicting blight is proportional to the wilderness stage in which the monster resides.

Monsters won't exhibit blight until later [wilderness](#wilderness) stages.

This ailment can be cured by a [salve](#salve). It can also be avoided if an attack is successfully [deflected](#deflection-chance) or [dodged](#dodge-chance).

#### Poison

Certain successful attacks by the monster can afflict you with poison, reducing maximum [health](#health) by a certain percentage. The magnitude of the health reduction and chance of inflicting poison is proportional to the wilderness stage in which the monster resides.

The effect gradually wears off as maximum health is restored over time, during which all healing effects can only restore health up to the currently-reduced maximum.

Monsters won't exhibit poison until later [wilderness](#wilderness) stages. Once poisoned, there is also a chance for monsters to inflict [blight](#blight).

This ailment can be cured by an [antidote](#antidote). It can also be avoided if an attack is successfully [deflected](#deflection-chance).

#### Recovery

Recovery occurs when damage is dealt, halting regeneration of [reserves](#reserves) and any [attack](#attack-rate) progress. Its duration is determined by the [recovery rate](#recovery-rate).

### Monster ailments

Ailments that are inflicted by you when attacking.

#### Bleeding

Attacks with a [piercing](#piercing-weapons) weapon may inflict bleeding on the monster, consisting of a proportional amount of damage inflicted regularly over a certain period of time. The extent of this is determined by the [bleed-rating](#bleed-rating).

Requires the [anatomy](#anatomy) skill.

#### Burning

Inflicted by fire [elemental](#elemental-damage) damage. While burning, the monster cannot [regenerate](#health-regeneration).

#### Frozen

Inflicted by ice [elemental](#elemental-damage) damage. While frozen, attack rate and movement speed (time to close [distance](#range)) is slowed.

#### Shocked

Inflicted by lightning [elemental](#elemental-damage) damage. While shocked, the monster takes more damage from all sources.

#### Staggered

While staggered, the monster deals less damage. The extent of this is determined by the [stagger rating](#stagger-rating).

Requires the [shieldcraft](#shieldcraft) skill.

#### Stunned

While stunned, the monster's hit accuracy is reduced, which may make it miss an attack completely. The extent of this is determined by the [stun rating](#stun-rating).

Requires the [traumatology](#traumatology) skill.

## Retirement

When reaching a certain stage, retirement is unlocked. Doing so restarts the game from [wilderness](#wilderness) stage 1 with [power level](#attributes) at 0 (hence no attributes), no [skills](#skills) (hence no [masteries](#masteries)) and no [gear](#gear). However, all carried [relics](#relics) are retained.

A [trait](#traits) can be also chosen that confers a permanent bonus that persists through future retirements. Retiring increases the current generation by 1.

### Perks

Certain starting bonuses are bestowed that grow more potent with each passing generation, i.e. how many times you have retired.

#### Starting essence

An amount of [essence](#essence) gifted at the start, allowing immediate spending on attributes and the [caravan](#caravan).

#### Essence loot bonus

A percentage indicating the amount of extra essence that is looted from defeated [monsters](#monster) and [bosses](#boss).

#### Monster reduction

A percentage determining the reduction of the amount of monsters there are to defeat per stage before being able to progress to the next one.

### Traits

Permanent passive abilities acquired upon [retiring](#retirement) for all subsequent new starts. One may be chosen at a time for every retirement.

#### Brawler

Being unshielded increases one-handed melee damage.

#### Bruiser

Current stamina adds to unarmed damage and unarmed attacks have a chance to [stun](#stunned) for each rank of the [strength](#strength) attribute. Stunning requires the [traumatology](#traumatology) skill.

#### Colossus

[Two-handed](#two-handed) melee weapons are used as one-handed weapons. This means a shield can be equipped alongside it and any effects applicable to one-handed weapons apply to two-handed weapons as well.

#### Executioner

[Critical](#critical-rating) strikes with a two-handed melee weapon may also [execute](#execution-threshold) the monster. Critical strikes require the [assassination](#assassination) skill.

#### Inoculated

A [deflection](#deflection-chance) chance base value is added to the current deflection chance. Requires a certain [skill](#skills).

#### Nudist

[Dodge](#dodge-chance) rate is increased when not wearing any armor, effectively reducing the amount of attribute points required in [agility](#agility) to reach the maximum possible dodge rate.

Dodging also heals a certain amount of [health](#health) on every dodge.

#### Sharpshooter

While at a [distance](#range), all attacks with a [ranged](#ranged-weapons) weapon are critical strikes.

#### Shredder

[Bleeding](#bleeding) damage is inflicted all at once, instead of being evenly spread over a certain duration.

#### Stalwart

There are no stamina costs associated with wearing armor.

#### Tank

Total [protection](#protection) is increased by the equipped shield's block chance.

### Quests

Quests are similar to achievements in that they have a set of requirements and track progress based on your progress and circumstances. They are unlocked once the journal [relic](#usable-relics) is acquired, and when having acquired a certain [skill](#skills).

Once a quest's requirements are achieved, the quest can be completed by choosing a permanent bonus to either [health](#health), [stamina](#stamina) or [total damage](#total-damage) that persists through retirement and while the journal is carried.

Quests are categorized into the following:

#### Conquests

Tracks combat-based activities.

#### Routines

Tracks non-combat-related activities.

#### Triumphs

A collection of challenges and hard-to-reach goals.
