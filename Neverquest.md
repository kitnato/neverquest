# Neverquest

An incremental, progressive browser-based Action RPG with idle elements.

The SLIM system generates a pseudo-random variety of names for different fantasy-themed Strangers, Locations, Items and Monsters that the player interacts with.

## Objectives

- Player always has something to do
- No explicit, arbitrary timeouts or countdowns
- No resets for incremental boni
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

These two are part of every game start.

##### Merchant

Sell and buy equipment. Has a limited amount of coin to spare. Amount of coin and discounts of selling and buying can be upgraded.

##### Mercenary

Acquire physical skills and passives.

#### Purchasable crew

Purchasing a caravan crew makes them available in the next encounter.

##### Cook

Restores all health. Grants a Well Fed buff.

##### Blacksmith

Repair, dismantle and upgrade equipment.

##### Alchemist

Buy potions and poisons.

##### Witch

Enchant and disenchant equipment.

##### Tailor

Upgrade backpack.

##### Wizard

Acquire sorceries, auras and passives.

##### Medic

Saves the character from death (no restart necessary).

## Character

Manage equipment. Manage skills. View buffs and debuffs.

### Resource

#### Health

Total amount of damage the player can take befor game over at 0 health.

#### Stamina

Consumed with every attack.

#### Energy

Consumed when activating skills and spells.

#### XP

Gained from killing monsters. Spent on attributes and to learn new skills. Costs increase for every allocation.

#### Level

+1 level for each attribute allocation and skill acquisition. The character level in combination with the global level determines the monster level.

#### Scrap

Gained from dismantling equipment at the blacksmith and dropped from monsters. Used to craft equipment.

#### Aether

Gained from disenchanting equipment and dropped from monsters. Used to enchant equipment.

#### Coin

Gained from selling scrap, aether and equipment. Dropped from monsters. Used to buy equipment and pay for services and items from stranger.

### Equipment

#### Weapons

2 slots, 1 for each hand.

##### Balanced

1 slot. Medium damage, medium attack rate.

##### Heavy

1 slot. High damage, low attack rate.

##### Light

1 slot. Low damage, high attack rate.

##### Two-handed

2 slots. Highest damage, low attack rate.

#### Armor

3 different slots. Armor value is subtracted from total damage received.

##### Chest

Each subsequent type increases the armor.

- None
- Light: low -% dodge, +% critical chance
- Sturdy: medium -% dodge, _???_
- Heavy: high -% dodge, -% attack rate, +% block, +% chance to deflect spells

##### Shield

Adds armor and +% block.

##### Jewelry

Various buffs and boni.

#### Potion

Grants temporary buff. Cures ailment. Adds poison damage to weapons.

#### Backpack

Grants inventory slots and potion slots.

### Skills

#### Physical

##### Dual wielding

#### Passive

#### Sorcery

#### Aura

### Attributes

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
