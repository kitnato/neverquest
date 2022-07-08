# Neverquest

_An irreverent UI-based incremental action role-playing game for web browsers._

This README serves as a gameplay guide, technical manual and glossary of terms. For anything prefaced with a `[TODO]` tag, see the [roadmap](#roadmap).

`[SCREENSHOT]`

The game is split up into the [character](#character) and the [encounter](#encounter) panels, with most interactions between the two taking place via a column of gameplay control buttons in between them.

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

#### Energy

`[TODO]`

Consumed when activating [skills](#skills), [auras](#auras) and [sorceries](#sorceries), regenerated over time.

### Resources

Collected by [looting](#looting) dead monsters and selling or dismantling items at the [caravan](#caravan).

#### Coins

Gained from selling scrap and items to the [merchant](#merchant) and dropped by certain rare monsters. Used to pay for [caravan](#caravan) crew, some of their services and any item purchases.

#### Essence

Gained from killing monsters and disenchanting gear. Primarily spent on attribute ranks. Essence cost increases for every such rank allocation.

`[TODO]` Essence can also be used to enchant gear.

#### Scrap

Gained from dismantling [gear](#gear) at the blacksmith and dropped from monsters. Used to craft gear and trade for coins.

### Attributes

Attributes each provide a direct increasing effect for each rank. Each rank allocation raises the character's power level by 1.

[Essence](#essence) is used to allocate ranks. The cost of allocation is increased for every rank.

#### Agility

Chance to dodge a monster's attack.

#### Dexterity

Chance of landing a critical hit.

#### Endurance

Maximum total stamina resource.

#### Fortitude

Stamina regeneration rate.

#### Luck

Amount of loot dropped by monsters.

#### Perception

Damage multiplier of a critical hit.

#### Resilience

Rate of recovery after being hit.

#### Speed

Rate of attack.

#### Strength

Base damage of an attack.

#### Vigor

Health regeneration rate.

#### Vitality

Maximum total health resource.

#### Acumen

`[TODO]`

Sorcery casting rate.

#### Intellect

`[TODO]`

Energy regeneration rate.

#### Tenacity

`[TODO]`

Amount of damage taken without needing to [recover](#recovery-rate).

#### Wisdom

`[TODO]`

Total [energy](#energy).

### Statistics

Derived from the character's [attributes](#attributes), [gear](#gear), and any current [ailments](#ailments).

#### Damage per second

Requires toggling on in the global [settings](#settings). If on, shows the expected damage per second the character can deal, taking into account [attack rate](#attack-rate), current [total damage](#total-damage) and [critical hits](#critical-chance).

#### Attack rate

Time duration between attacks, not considering any interruptions such as [recovery](#recovery-rate).

#### Block chance

Percentage chance that when defending, all incoming non-protected damage is blocked.

#### Critical chance

Percentage chance that when attacking, critical damage is dealt, which multiplies [total damage](#total-damage).

#### Critical damage

Percentage increase of total damage dealt when attacking in case of a [critical hit](#critical-chance).

#### Dodge chance

Percentage determining the chance of when defending, the character avoids all damage entirely.

#### Health regeneration rate

Time duration until [health](#health) is restored by one point.

#### Parry chance

Percentage determining the chance of when defending, the character only taking 50% of damage (before protection) and reflecting the 50% on to the attacker.

#### Protection

Amount of damage that is discarded from the total when defending.

#### Recovery rate

Recovery occurs when the character is dealt damage, halting regeneration of [reserves](#reserves) and the [attack meter](#attack-rate). It is bounded by a certain duration.

#### Stamina regeneration rate

Time duration until [stamina](#stamina) is restored by one point.

#### Total damage

Damage from [strength](#strength) in addition to [weapon](#weapons) damage with any other bonuses.

## Combat

The [wilderness](#wilderness) initially always has a lurking [monster](#monster). When ready, the character can choose to **attack** continuously based on their [attack rate](#attack-rate), **engaging** the monster in the process. While engaged, the monster will also attack continuously, triggering the character to **defend** themselves. When the monster hits the character, [recovery](#recovery-rate) is triggered. While recovering, the character won't be able to attack or regenerate their [reserves](#reserves).

Both the character and monster will keep attacking one another until either the character **retreats**, upon which the monster's health instantly regenerates to its maximum, or if the monster or character is dead (either of their health reaches zero).

Upon a monster's death, the wave progress is incremented, its remains are looted and the next monster in the wave is engaged automatically, unless the character retreats.

The character will enter a **resting** state once the wave is complete and there are no more monsters to fight.

### Combat mechanics

Apart from attacking, retreating and defending, there are several mechanics that occur during combat.

Some of the following effects are intrinsic to gear and can't be controlled directly the way [attributes](#attributes) are. Others also don't appear as part of [statistics](#statistics), as they become apparent in the character and monster status screens.

#### Block

A successful block by the character upon a monster's attack will negate all damage done, yet costs [stamina](#stamina). Blocking will also inflict a certain [stagger](#stagger) duration on the monster.

The overall chance to block an attack is determined by the [block chance](#block-chance) statistic.

#### Deflection

`[TODO]`

The chance for the character to completely ignore all effects of an incoming monster's non-physical damage and/or [ailment](#ailments).

#### Dodge

Dodging an incoming attack negates all damage, but doesn't cost any stamina the way [blocking](#block) does.

The overall chance to dodge an attack is determined by the [dodge chance](#dodge-chance) statistic.

#### Execution

A successful execution by the character immediately kills the monster when the attack lands.

#### Exhaustion

When there is no [stamina](#stamina) to attack or block, the character must wait for it to [regenerate](#stamina-regeneration-rate) first before being able to do either.

#### Looting

After the monster is defeated, its remains are looted automatically for any [resources](#-resources). This takes a few seconds, but can be shortened with certain [traits](#traits) or [items](#inventory).

The looted resources can only be collected once the [wave](#wilderness) is completed.

#### Parry

A successful parry will deal 50% of the total damage of the attack and reflect the other 50% back to the attacker.

The overall chance to parry an attack is determined by the [parry chance](#parry-chance) statistic.

#### Stagger

When staggered, the monster will not be able to attack for a certain duration. The character is considered staggered themselves when they are [recovering](#recovery-rate).

## Encounter

The main panel to the right of the screen. It changes based on one of the two possible locations of the character, [wilderness](#wilderness) and [caravan](#caravan).

### Wilderness

Engage and fight monsters. Every wilderness level has a certain amount of monsters (a wave) of a certain power determined by the level and current wave progress. The name of the wilderness level is randomly generated by [LOCRA](#locra).

The level is considered completed when the wave progress is at its maximum after having killed all the monsters. At this point, any [loot](#looting) can be collected and the character can progress to the [caravan](#caravan).

### Monster

A creature with a randomly generated name that will continuously attack the character as soon as it's [engaged](#combat). It has health and a certain attack rate both determined by the current wilderness level.

### Caravan

Encountered after completing a [wilderness](#wilderness) level.

All goods and services offered by the caravan crew are purchasable with [coins](#coins), [scrap](#scrap) or [essence](#essence), granting various different bonuses. Once at the caravan, the only other option apart from interacting with the crew is to return to the wilderness, which will be one level higher than before.

The [merchant](#merchant) is always present from the start. Other crew members can be acquired at a cost of coins, who then offer more goods and services. Some have additional requirements before they are unlocked for purchase.

#### Alchemist

`[TODO]`

Buy [elixirs](#elixirs), [salves](#salves) and [poisons](#poisons).

#### Blacksmith

Repairs, dismantles, crafts and upgrades [weapons](#weapons) and [armor](#armor). Requires coins as well as scrap.

#### Cook

Restores all [health](#health), [stamina](#stamina) and [energy](#energy) when purchasing a hot meal.

`[TODO]` Grants a Well Fed [buff](#buffs) for the first wave (+10% [mastery](#mastery) gain).

#### Medic

Their presence saves the character from death (no restart necessary) once per wilderness level in return for a percentage of all of the character's current [resources](#resources). Upgrades to the medic's supplies, paid in coins and/or scrap, reduce this death payment.

Also sells first aid kits that can cure a bleed effect and restore a certain amount of health over time.

#### Mercenary

Offers acquisition of new physical [skills](#skills) and [attributes](#attributes).

#### Merchant

Sell and buy items. Exchange scrap for coins. Coins can then be used to purchase whatever the merchant has available and used for other goods and services of the caravan.

The merchant's inventory of items will grow and diversify after each new wilderness level.

#### Sorcerer

`[TODO]`

Acquire [sorceries](#sorceries) and [auras](#auras). Acquire certain attributes.

#### Tailor

Sells upgrades for increasing maximum [encumbrance](#encumbrance.

`[TODO]` Also allows adding extra [potion](#potions) slots, as well as extra [trinket](#trinkets) slots.

#### Witch

`[TODO]`

Enchant and disenchant [gear](#gear), requiring essence. Acquire certain attributes.

## Inventory

The inventory is accessible as soon as the character acquires the [knapsack](#knapsack) from the merchant.

Before acquiring the knapsack, all equippable items are automatically equipped if possible and all consumables are immediately consumed. Additionally, [encumbrance](#encumbrance) can't be extended.

An item can either be;

a) a piece of [gear](#gear), or
b) a consumable like an [elixir](#elixirs), or
c) a [trinket](#trinkets) that grants special effects when equipped.

### Knapsack

Allows for the storage of items. Allows equipping and un-equipping [gear](#gear). Purchasable from the [merchant](#merchant).

### Encumbrance

The inventory size is constrained by encumbrance, to which each carried or equipped item adds a certain amount. No further items can be acquired until the remaining encumbrance allows for it.

Viewing encumbrance and managing it can only be accomplished once the [knapsack](#knapsack) is acquired.

### Gear

Items that can be equipped and unequipped from the inventory.

The [merchant](#merchant) sells low quality versions of all gear types at various levels, which lack the property marked with a `[HQ]` tag. To acquire gear with the `[HQ]` property, they need to be crafted by the [blacksmith](#blacksmith).

#### Weapons

Weapons are the main way of fighting monsters. Every weapon type and class has specific modifiers, as well as various tradeoffs for wielding them.

##### Weapon type

The type of weapon determines how combat occurs.

###### Melee

Standard type that has no special features.

###### Ranged

`[TODO]`

##### Weapon class

Whatever its [type](#weapon-type), a weapon falls into one of several classes that intrinsically grants certain modifiers.

Each slot corresponds to one hand being used to wield said weapon. Only one weapon can be equipped at a time, unless the [dual wielding](#dual-wielding) skill is acquired.

###### Unarmed

No initial modifiers.

###### Light weapon

- 1 slot
- Low damage
- High attack rate
- Low stamina cost
- `[HQ]` Chance to [bleed](#bleed)
- Low cost

###### Balanced weapon

- 1 slot
- Medium damage
- Medium attack rate
- Low stamina cost
- `[HQ]` +% [parry chance](#parry-chance)
- Medium cost

###### Heavy weapon

- 1 slot
- High damage
- Low attack rate
- Medium stamina cost
- `[HQ]` Chance to [stagger](#stagger) for 1.5s
- High cost

###### Two-handed weapon

`[TODO]`

- 2 slots
- Highest damage
- Lowest attack rate
- High stamina requirement
- `[HQ]` Chance for [execution](#execution)
- Medium cost

#### Armor

Armor provides [protection](#protection). When hit by an attack, the protection value is subtracted from total damage received.

Each of the following armor classes increases the protection value and adds certain modifiers.

##### No armor

No initial modifiers.

##### Hide armor

- Low protection
- `[HQ]` Chance to avoid [bleed](#bleed)
- Low cost

##### Reinforced armor

- Medium protection
- Low -% dodge
- `[HQ]` Chance to avoid bleed
- `[HQ]` +% [block chance](#block-chance)
- Medium cost

##### Plate armor

`[TODO]`

- High protection
- High -% dodge
- -% attack rate
- `[HQ]` Chance to avoid bleed
- `[HQ]` +% block chance
- `[HQ]` Chance to [deflect](#deflection) spells
- High cost

#### Off-hand

This slot allows the wielding of [shields](#shields).

`[TODO]` Can also be taken up by [two-handed weapons](##two-handed) and any other off-hand items.

##### Shields

Grants block chance, providing a percentage [chance to block](#block-chance) all incoming damage. Also grants [stagger](#stagger).

###### Small shield

- Low chance to block
- Low stagger duration
- Low stamina cost
- `[HQ]` +% [dodge chance](#dodge-chance)
- Low cost

###### Medium shield

- Medium chance to block
- Medium stagger duration
- Low stamina cost
- `[HQ]` +% [parry chance](#parry-chance)
- Medium cost

###### Tower shield

- High chance to block
- High stagger duration
- High stamina cost
- `[HQ]` +% [protection](#protection)
- High cost

#### Trinkets

Can grant various [buffs](#buffs) and other effects while equipped. Initially, only one trinket can be equipped at a time, but more slots can be acquired via the [tailor](#tailor).

The following are some of the early items available from the merchant.

##### Compass

Allows the character to restart the current wilderness level upon initial completion rather than only being able to go to the caravan. This increases the amount of collectable [loot](#resources) at that level.

##### Hearthstone

Allows the character to go to the caravan regardless of if the current wilderness level's wave is cleared or not. Character cannot be engaged in combat to use it.

### Potions

`[TODO]`

One of three types that take up the potion slot(s).

Further slots can be added by the [tailor](#tailor).

#### Elixirs

Restores health, stamina or both. Purchased from the [alchemist](#alchemist).

#### Poisons

Adds poison to weapons automatically with each hit, applying damage-over-time effects and potentially other ailments. Has a certain number of charges before it is used up.

#### Salves

Grants a temporary [buff](#buffs), or cures or temporarily immunizes against [ailments](#ailments).

## Mastery

`[TODO]`

Using a particular weapon or armor type increases its associated mastery. Weapon mastery increases when attacking and armor mastery increases when being hit.

Leveling up mastery confers bonuses on the respective armor and weapon types. Certain weapons require mastery levels before they can be used effectively.

## Skills

Skills are acquired from caravan crew and can either be activated or passive.

### Activated skills

`[TODO]`

Once acquired, activating a skill requires [energy](#energy).

#### Auras

Cast spells that remain active until dispelled. Provides [buffs](#buffs) in return for reserving a percentage of energy.

#### Physical

Special combat skills that can be activated during combat.

#### Sorceries

Cast spells with immediate and/or over-time effects.

### Passive skills

Permanent effects that once acquired always provide their benefits.

#### Armorcraft

Allows the use of [reinforced](#reinforced-armor) and [plate](#plate-armor) armors.

#### Assassination

Unlocks [dexterity](#dexterity) and [perception](#perception) attributes, as well as [critical chance](#critical-chance) and [critical damage](#critical-damage) modifiers on [gear](#gear).

#### Butchery

Unlocks the ability to [execute](#execution), as well as its modifiers on gear.

#### Calisthenics

Unlocks the [fortitude](#fortitude) and [vigor](#vigor) attributes.

#### Escrime

Unlocks the ability to [parry](#parry), as well as its modifiers on gear.

#### Siegecraft

Allows the use of [heavy](#heavy-weapon) and [two-handed](#two-handed-weapon) weapons.

#### Shieldcraft

Allows the use of [medium](#medium-shield) and [tower](#tower-shield) shields.

#### Quick reflexes

Unlocks [agility](#agility) attribute and [dodge chance](#dodge-chance) modifiers on gear.

#### Dual wielding

`[TODO]`

Allows the use of a 1-handed weapon in main hand as well as offhand.

## Status effects

Temporary or permanent effects granted or changing the current monster or character status.

### Ailments

Negative status effects that dampen the character or monster. For the character, they may be treated by [potions](#potions) and other items.

#### Bleed

Certain successful attacks by a monster or the character can inflict bleed, a damage over time effect constrained by a total amount of damage inflicted regularly over a certain period of time. Bleed effects can be stemmed by a [first aid kit](#medic) or certain [salves](#salves).

#### Diseased

`[TODO]`

#### Poisoned

`[TODO]`

### Buffs

Positive status effects that boost or improve the character or monster.

## Traits

`[TODO]`

Traits are permanent passive abilities that are unlocked when reaching certain Mastery levels as well as certain Attributes.

- Bruiser: current stamina adds unarmed bonus damage.
- Nudist: double dodge rate when not wearing any armor.
- Scrounger: double looting rate.

## Achievements

`[TODO]`

Meta progression. Grant bonuses when completed.

### Combat achievements

- Kill first monster
- Kill 5/10/25/50/100/1000 monsters _(5 achievements)_
- Kill a monster in one hit
- Kill a monster with bleed damage
- Dodge 1/5/10/25/50/100 hits
- Dodge 3 hits in a row
- Reflect damage

### Caravan achievements

- Purchase an item
- Hire first new crew member
- Hire X _(X = crew member)_

### Gear achievements

- Equip a weapon
- Equip armor
- Equip a shield

### Meta

- Achieve 5/10/25/50/100/all achievements

## Settings

These are accessible via the "?" menu on the page header. They allow the activation and deactivation of certain global features.

### NSFW mode

Default: off. Toggles the generation of not-safe-for-work words in [LOCRA](#locra).

### Show damage per second (DPS)

Default: off. Toggles DPS information for the character, gear and monster.

### Auto-equip new items

Default: on. Toggles the automatic equipping of weapons, armor, shields and potions once they are acquired. Cannot be set to off until the [knapsack](#knapsack) is acquired.

### Low health warning

Default: on. Toggles a popover warning to prompt a retreat when the character's health drops below 33% of its maximum.

### Show all elements

Default: off. Once toggled, all elements of the UI will be shown at once instead of being unlocked gradually as gameplay progresses and features become relevant. Suitable for veteran players starting a new run.

## LOCRA

The LOCRA (LOcation, CReature, Artifact) system generates a pseudo-random variety of names for different irreverent fantasy-themed items and monsters that the character interacts with.

It works by generating a name for a location, creature or artifact based on a JSON library of (loosely) fantasy-world-themed words that can be composed to make (somewhat) coherent names for the three types in question. Parameters for tags and affix composition can be passed to make the generation more specific. If [NSFW mode](#nsfw-mode) is on, the names may also be pornographic or decidedly non-fantasy-themed.

Generating a creature name, for example, depending on the parameters passed, might yield anything from "Intrepid Farmer" to "Voluptuous Manticore of Unmitigated Penetration".

LOCRA can be considered somewhat independent of Neverquest, as it can be used outside of the game's implementation. Nevertheless, it is bundled as part of the same codebase, accessible under `src/locra`.

## Roadmap

Neverquest is a work-in-progress. Several features marked with `[TODO]` are pending refinement and implementation.

- `v1.0.0` [CURRENT] -

## Local set up

To run the app locally from source, you will need to use a command-line interface (CLI), as well as have [git](https://git-scm.com/downloads) and [NPM](https://docs.npmjs.com/cli/v8/configuring-npm/install) installed globally.

1. Open the CLI and change into a suitable directory (e.g. "My Documents" folder)
1. Run `git clone git@github.com:cneuro/neverquest.git`
1. Run `cd neverquest`
1. Run `npm install`
1. Run `npm start`
1. Open [http://localhost:3000](http://localhost:3000) in a web browser.

## Implementation

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Written in [TypeScript](https://www.typescriptlang.org/).

- The UI framework is provided by [Bootstrap](https://react-bootstrap.github.io).

- The app state management library is [Jotai](https://jotai.org).

- Animations are provided by [Animate.css](https://animate.style/).

## License

Neverquest &copy; 2022 is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Appendices

### 1. Gameplay objectives

- Player always has something to do
- No long waits, cliffs or walls
- No obligatory resets for incremental gains
- No excessive or repetitive clicking
- Decisions are frequent and they matter
- High character build variety
- Manage an economy of resources and character builds with trade-offs

### 2. [Warren Spector's 6+2+1 questions](https://www.gamedeveloper.com/design/warren-spector-traces-i-deus-ex-i-s-development-back-to-a-game-of-d-d)

1. What’s the core idea? Can you describe the core of the game in 2-3 sentences?
   - An incremental action RPG, focusing on player interaction, which can be played in any browser on any system. Exploring and fighting through the hostile world yields its secrets, with the only respite being a gradually growing caravan of .
1. Why do this game?
   - I want to play it, I can’t find anything like it. Other UI-focused browser-based games are either idle clickers or Flash-based monstrosities.
1. What are the development challenges?
   - Free time, i.e. funding.
1. How well-suited to video games is the idea?
   - It is unique to video games since it requires lots of numerical computation.
1. What’s the player fantasy?
   - Ever increasing power and challenge with the freedom to build how said power and challenges are surmounted.
1. What does the player do? (What are the “verbs” of the game?)
   - Explore
   - Fight
   - Loot
   - Level up
   - Encounter
   - Trade
1. Has anyone done this before?
  Not quite in the same way. Clear influences are:
   - Progress Quest (the progenitor of all text-heavy UI-based incremental games, also with a swords & sorcery fantasy theme)
   - Trimps (complex idle/incremental all about building )
   - Kingdom of Loathing (one of the first purely browser-based UI-focused adventure RPGs with an irreverent sense of humor)
   - Candybox 1 & 2 (another irreverent UI-heavy fantasy adventure with 2D world elements heavy on player interaction and with player death)
   - Crank (user-interaction-driven adventure/mystery game with gradually expanding storyline and gameplay)
   - Swarm Simulator (the premier Bootstrapped-based incremental/idle browser game all about ever-increasing numbers and progress bars)
   - NGU Idle (incremental irreverent UI-based fantasy adventure)
   - Hero Simulator (light-hearted fantasy setting with many upgrades)
1. What’s the one new thing?
   - Influence every aspect of your character without the need for tropes and archetypes.
1. Do you have something to say?
   - Browser games with only text, UI and no graphics can be just as engaging as and can have similar gameplay depth to traditional video games without relying solely on simplistic deterministic incremental progress.