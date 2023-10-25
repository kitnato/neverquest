# Neverquest

_An irreverent UI-based incremental rogue-lite action role-playing game._

`[SCREENSHOT]`

**For a full breakdown of gameplay, please consult the [manual](./src/data/manual.md).**

## LOCRAN

The LOCRAN (LOcation, CReature, Artifact, Name) system generates a pseudo-random variety of names for different irreverent fantasy-themed wildernesses, items and monsters.

A JSON library of (loosely) fantasy-world-themed words is the basis for the generation and composition of (somewhat) coherent names for the three namesake types. Parameters for tags and affix composition can be passed to make the generation more specific. If [NSFW mode](./src/data/manual.md#nsfw-mode) is on, the names may also be pornographic or decidedly non-fantasy-themed.

LOCRAN can be considered somewhat independent of Neverquest, as it can be used outside of the game's implementation. Nevertheless, it is bundled as part of the same codebase, accessible under `src/LOCRAN`.

## Roadmap

Neverquest is a work-in-progress. Several features are pending ideation, refinement and implementation.

### Must-haves

Essential features for a v1.0.0 release.

#### Journal

Upon purchasing the Journal trinket, unlocks quests that function similarly to achievements. Completing a quest grants [essence](./src/data/manual.md#essence).

### Future development

Features that require more ideation and refinement.

#### Activated skills

Once acquired, activating a skill requires [energy](#energy).

##### Auras

Cast spells that remain active until dispelled. Provides [buffs](./src/data/manual.md#buffs) in return for reserving a percentage of energy.

##### Physical (activated)

Combat skills that can be activated during combat. Acquired from the [Mercenary](./src/data/manual.md#mercenary).

##### Sorceries

Cast spells with immediate and/or over-time effects. Acquired from the [sorcerer](#sorcerer).

#### Attributes

##### Acumen

Affects [sorcery](#sorceries) casting rate.

##### Intellect

Affects energy regeneration rate.

##### Wisdom

Affects total [energy](#energy).

#### Caravan

Along with two more additional hires, the entire crew dialog system needs to be overhauled and expanded to allow for better storytelling and immersion.

##### Cook

Sells hot meals that restore all [energy](#energy) when used.

Grants a Well Fed [buff](./src/data/manual.md#buffs) for the next stage (+10% [mastery](./src/data/manual.md#mastery) gain).

##### Sorcerer

Acquire [sorceries](#sorceries) and [auras](#auras).

#### Energy

A [reserve](./src/data/manual.md#reserves), Consumed when activating [skills](./src/data/manual.md#skills), [auras](#auras) and [sorceries](#sorceries), regenerated over time.

#### Log

A toggle-able UI element that displays all stateful activities in real-time, e.g. combat details, transactions etc.

#### Ranged

A [weapon](./src/data/manual.md#weapons) type that functions distinctly from melee weapons.

#### Venom

A [potion](./src/data/manual.md#potions), that once applied to a weapon, it adds an effect with each strike, applying damage-over-time effects and potentially other ailments. Has a certain number of charges before it is used up.

## Local set up

To run the app locally from source, you will need to use a command-line interface (CLI), as well as have [git](https://git-scm.com/downloads) and [NPM](https://docs.npmjs.com/cli/v8/configuring-npm/install) installed globally.

### Install & run the app

1. Open the CLI and change into a suitable directory
1. Run `git clone git@github.com:kitstigator/neverquest.git`
1. Run `cd neverquest`
1. Run `npm install`
1. Run `npm start`
1. Open [http://localhost:5173](http://localhost:5173) in a web browser.

### Local development

After [installation](./src/data/manual.md#install--run-the-app), but before committing any changes, please do the following:

1. In the CLI, go to the project folder (e.g. `cd neverquest`).
1. Run `npm run prepare`

Now, every time changes are committed, all the relevant code, markup and style linters & formatters will apply any changes automatically.

The linter config can be viewed in `.eslintrc.json`, `.stylelintrc.json` and `.prettierc.json`.

## Implementation

- Written in [TypeScript](https://www.typescriptlang.org).

- Icons and art assets are provided under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) by the talented [authors](https://game-icons.net/about.html#authors) of [game-icons.net](https://game-icons.net).

- UI framework is [Bootstrap](https://react-bootstrap.github.io).

- State management library is [Recoil](https://recoiljs.org).

- Animation library is [Animate.css](https://animate.style).

- Runs on [Vite](https://vitejs.dev).

- Code style & linting is provided by [eslint](https://eslint.org), [stylelint](https://stylelint.io) and [prettier](https://prettier.io), based on the [@kitstigator/eslint-config-functional](https://github.com/kitstigator/eslint-config-functional) rules.

- Automation is provided by [husky](https://typicode.github.io/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

## License

![CC BY-NC-SA 4.0](/public/by-nc-sa.eu.svg?raw=true)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Appendix

### 1. Gameplay objectives

- Player always has something to do
- No long waits, cliffs or walls
- No obligatory resets for incremental gains
- No excessive or repetitive clicking
- Decisions are frequent and they have immediate gameplay impact
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
