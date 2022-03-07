# Neverquest

An incremental, progressive browser-based Action RPG with idle elements.

The SLIM system generates a pseudo-random variety of names for different fantasy-themed Strangers, Locations, Items and Monsters that the player interacts with.

## Objectives

- Player always has something to do
- No explicit, arbitrary timeouts or countdowns
- No resets for incremental bonuses
- Every run can be different
- More like Crank, less like Trimps
- No carpal tunnel
- Working towards an ultimate goal to truly end the game
- Manage an economy of resources
- Things don’t take aaaages

### Spector 6+2+1

1. What’s the core idea? Can you describe the core of the game in 2-3 sentences?
   - An incremental game with Action RPG, focusing on player interaction. No long waits, cliffs or walls. No obligatory resets for incremental gains.
1. Why do this game?
   - I want to play it, I can’t find anything like it
1. What are the development challenges?
   - Free time, i.e. funding
1. How well-suited to video games is the idea?
   - It is unique to games since it requires lots of number work
1. What’s the player fantasy?
   - Ever increasing power and challenge
1. What does the player do? (What are the “verbs” of the game?)
   - Explore
   - Fight
   - Loot
   - Level up
   - Encounter
1. Has anyone done this before?
   - Trimps
   - NGU Idle
   - Candybox 1 & 2
   - Crank
   - Antimatter
   - Swarm Simulator
1. What’s the one new thing?
   - Influence every aspect of your character without the need for tropes and archetypes
1. Do you have something to say?
   - Browser games with only UI and no graphics can be as engaging as bigger games.

## SLIM

Generator of random names for Stranger, Location, Item and Monster. They are generated from a database of words based on probabilities.

“[the]” is only added if the part in question is also a Type.

### Stranger

Prefix (70%) + Type (100%) + [the] Suffix (50%)

### Location

Prefix (80%) + Type (100%) + [the] Suffix (33%)

### Item

Prefix (80%) [‘s] + Type (100%) + Suffix 1 (70%) + [the] Suffix 2 (90%)

### Monster

Prefix (80%) + Type (100%) + [the] Suffix (60%)

## Gameplay

### Wilderness

Engage and fight monsters. Every wilderness level has a certain amount of monsters. Killing all monsters increases the next wilderness level by 1 and allows progression to the Caravan.

### Caravan

Encountered after finishing every wilderness level. Can be upgraded to add more crew. All goods and services are purchasable with coins, scrap or aether. Once there, the only option is to go back to the wilderness.

#### Default crew

The following two members are always present at game start.

##### Merchant

Sell and buy items. The only source of coins for the player by selling their items. Has a limited amount of coin to spare. Amount of coins and discounts of selling and buying can be upgraded.

##### Mercenary

Acquire new physical skills, attributes and passives.

#### Purchasable crew

Purchasing a caravan crew member makes them available in the next encounter.

##### Cook

Restores all health. Grants a Well Fed buff.

##### Blacksmith

Repair, dismantle, craft and upgrade equipment. Requires coins as well as scrap and aether.

##### Alchemist

Buy potions and poisons.

##### Witch

Enchant and disenchant equipment. Acquire attributes.

##### Tailor

Upgrade backpack.

##### Sorcerer

Acquire sorceries and auras. Acquire attributes.

##### Medic

Saves the character from death (no restart necessary) in return for a percentage of all coins, scrap and aether.

## Character

Manage equipment. Manage skills. View buffs and debuffs.

### Resource

#### Health

Total amount of damage the player can take before game over at 0 health.

#### Stamina

Consumed with every attack.

#### Energy

Consumed when activating skills and sorceries.

#### XP

Gained from killing monsters. Spent on attributes and to learn new skills. Costs increase for every allocation.

#### Level

+1 level for each attribute allocation and skill acquisition. The character level in combination with the global level determines the monster level.

#### Scrap

Gained from dismantling equipment at the blacksmith and dropped from monsters. Used to craft equipment.

#### Aether

Gained from disenchanting equipment and dropped from monsters. Used to enchant equipment.

#### Coin

Gained from selling scrap, aether and items to Merchant. Used to pay for services and items from caravan crew.

### Equipment

#### Weapons

2 slots, 1 for each hand.

##### Light

1 slot. Low damage, high attack rate. Chance to bleed.

##### Balanced

1 slot. Medium damage, medium attack rate.

##### Heavy

1 slot. High damage, low attack rate. Chance to stun.

##### Two-handed

2 slots. Highest damage, lowest attack rate, chance for execution (instant monster death).

#### Armor

Each subsequent type increases the armor value. Armor value is subtracted from total damage received.

- None: no modifiers
- Light: lowest armor, low -% dodge, +% critical chance
- Reinforced: medium armor, medium -% dodge, +% damage
- Heavy: high armor, high -% dodge, -% attack rate, +% block, +% chance to deflect spells

#### Shield

Adds armor and +% block.

#### Jewelry

Various buffs and bonuses.

#### Potion

Grants temporary buff. Cures ailment. Adds poison damage to weapons.

#### Backpack

Grants inventory slots and potion slots.

### Mastery

Using a particular weapon or armor type increases its associated mastery. Weapon type mastery increases when attacking and armor when being hit. Leveling up mastery confers bonuses on the weapon types.

Certain weapons require mastery levels before they can be used effectively.

### Skills

#### Physical

#### Passive

Permanent effects that once acquired always provide their benefits.

##### Dual wielding

Allows the use of a 1-handed weapon in main hand as well as offhand.

##### Shieldcraft

Allows the use of a shield in offhand.

#### Sorcery

Cast spells with immediate and/or over-time effects.

#### Aura

Cast spells that remain active until dispelled. Provides buffs and other positive status effects in return for reserving a percentage of energy.

### Attributes

Named attributes each provide a direct effect for each point assigned.

#### Health

Maximum total health resource.

#### Vitality

Health regeneration amount per rate tick.

#### Vigor

Health regeneration rate.

#### Stamina

Maximum total stamina resource.

#### Fortitude

Stamina regeneration amount.

#### Endurance

Stamina regeneration rate.

#### Wisdom

Total energy.

#### Intellect

Energy regeneration amount.

#### Intuition

Energy regeneration rate.

#### Strength

Increases total damage of an attack.

#### Agility

Chance to dodge a monster's attack.

#### Speed

Increases rate of attack.

#### Resilience

Rate of recovery after being hit.

#### Acumen

Casting rate.

#### Dexterity

Chance of landing a critical hit.

#### Perception

Damage multiplier of a critical hit.

#### Luck

Increases the amount of loot dropped by monsters.

## Achievements

Meta progression. Grant bonuses when completed.

### Combat

- Kill first monster
- Kill 5/10/25/50/100/1000 monsters _(5 achievements)_
- Kill a monster in one hit
- Kill a monster with bleed damage
- Dodge 1/5/10/25/50/100 hits
- Dodge 3 hits in a row
- Reflect damage

### Caravan

- Purchase an item
- Hire first new crew member
- Hire X _(X = crew member)_

### Equipment

- Equip a weapon
- Equip armor
- Equip a shield

### Meta

- Achieve 5/10/25/50/100/all achievements (lol)
