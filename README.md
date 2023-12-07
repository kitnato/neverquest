# Neverquest

_An irreverent UI-based incremental action RPG._

`[SCREENSHOT]`

**For a full breakdown of gameplay, please consult the [manual](./src/data/manual.md).**

## Local set up

To run the app locally from source, you will need to use a command-line interface (CLI).

### Installation

Prerequisites:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en) 18 or later
- NPM 8 or later

1. Open the CLI and change into a suitable directory (e.g. `cd neverquest`).
1. Run `git clone git@github.com:kitnato/neverquest.git`
1. Run `cd neverquest`
1. Run `npm install`
1. Run `npm start`
1. Open [http://localhost:5173](http://localhost:5173) in a web browser.

### Local development

After [installation](#installation), but before committing any changes, do the following:

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

- Code style & linting is provided by [eslint](https://eslint.org), [stylelint](https://stylelint.io) and [prettier](https://prettier.io), using [@kitnato/eslint-config-succinct](https://github.com/kitnato/eslint-config-succinct).

- Automation is provided by [husky](https://typicode.github.io/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

## License

![CC BY-NC-SA 4.0](/public/by-nc-sa.eu.svg?raw=true)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0).

## Appendix

### 1. Gameplay objectives

- Player always has something to do
- No long waits, cliffs or walls
- Can be played in the background
- No excessive or repetitive clicking
- Decisions are frequent and they have immediate gameplay impact
- High character build variety
- Manage an economy of resources and character builds with trade-offs

### 2. [Warren Spector's 6+2+1 questions](https://www.gamedeveloper.com/design/warren-spector-traces-i-deus-ex-i-s-development-back-to-a-game-of-d-d)

1. What's the core idea? Can you describe the core of the game in 2-3 sentences?
   - An incremental action RPG, focusing on player interaction, which can be played in any browser on any system. Exploring and fighting through the hostile world yields its secrets, with the only respite being a gradually growing caravan of goods and services that enhance, expand and upgrade gameplay.
1. Why make this game?
   - I want to play it and I can't find anything like it.
1. What are the development challenges?
   - The amount of my free time I can dedicate.
1. How well-suited to video games is the idea?
   - It is unique to video games since it requires lots of numerical and state-based computation.
1. What’s the player fantasy?
   - Ever increasing power and challenge with the freedom to build how said power and challenges are surmounted.
1. What does the player do? (What are the “verbs” of the game?)
   - Fight
   - Loot
   - Level up
   - Encounter
   - Trade
1. Has anyone done this before?
   Not quite in the same way. Clear influences are:
   - Diablo - and its sequels (gameplay loop of randomized monster slaying, loot collecting and town visiting)
   - Progress Quest (the progenitor of all text-heavy UI-based incremental games, also with a swords & sorcery fantasy theme)
   - Progress Knight (fantasy incremental focused on rags-to-riches career progression)
   - Kingdom of Loathing (one of the first purely browser-based UI-focused adventure RPGs with an irreverent sense of humor)
   - Candybox 1 & 2 (another irreverent UI-heavy fantasy adventure with 2D world elements heavy on player interaction and with player death)
   - Crank (user-interaction-driven adventure/mystery game with gradually expanding storyline and gameplay)
   - NGU Idle (irreverent UI-based fantasy incremental idle game)
1. What's the one new thing?
   - Feels like text-based Diablo, but it's a web app.
1. Do you have something to say?
   - Browser games with only text and a GUI can be just as engaging and can have similar gameplay depth to traditional video games without relying solely on simple deterministic incremental progress.
