// import { browser } from '$app/environment';
// import { writable } from 'svelte/store';

// export type IntruderToken = {
// 	name: string;
// 	threat: 0 | 1 | 2 | 3 | 4;
// 	damage: 0 | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10;
// 	rotation: number;
// 	src: string;
// 	id: string;
// };

// export type GameState = {
// 	inBag: IntruderToken[];
// 	players: 1 | 2 | 3 | 4 | 5;
// 	inPlay: IntruderToken[];
// 	developing: IntruderToken[];
// 	encounter: IntruderToken[];
// 	version: number;
// };

// export enum Intruders {
// 	QUEEN = 'Queen',
// 	BREEDER = 'Breeder',
// 	ADULT = 'Adult',
// 	CREEPER = 'Creeper',
// 	LARVA = 'Larva',
// 	BLANK = 'Blank'
// }

// enum ImageSrc {
// 	QUEEN = 'Queen2.webp',
// 	BREEDER = 'Breeder.webp',
// 	ADULT = 'Adult.webp',
// 	CREEPER = 'Creeper.webp',
// 	LARVA = 'Larva.webp',
// 	BLANK = 'Blank.webp'
// }

// const ALL_INTRUDERS: IntruderToken[] = [
// 	{ name: Intruders.QUEEN, threat: 4, damage: 0, src: ImageSrc.QUEEN, id: Intruders.QUEEN + '_i1' },
// 	{
// 		name: Intruders.BREEDER,
// 		threat: 4,
// 		damage: 0,
// 		src: ImageSrc.BREEDER,
// 		id: Intruders.BREEDER + '_i1'
// 	},
// 	{ name: Intruders.ADULT, threat: 4, damage: 0, src: ImageSrc.ADULT, id: Intruders.ADULT + '_i1' },
// 	{ name: Intruders.ADULT, threat: 3, damage: 0, src: ImageSrc.ADULT, id: Intruders.ADULT + '_i2' },
// 	{ name: Intruders.ADULT, threat: 2, damage: 0, src: ImageSrc.ADULT, id: Intruders.ADULT + '_i3' },
// 	{ name: Intruders.ADULT, threat: 2, damage: 0, src: ImageSrc.ADULT, id: Intruders.ADULT + '_i4' },
// 	{
// 		name: Intruders.CREEPER,
// 		threat: 2,
// 		damage: 0,
// 		src: ImageSrc.CREEPER,
// 		id: Intruders.CREEPER + '_i1'
// 	},
// 	{
// 		name: Intruders.CREEPER,
// 		threat: 2,
// 		damage: 0,
// 		src: ImageSrc.CREEPER,
// 		id: Intruders.CREEPER + '_i2'
// 	},
// 	{ name: Intruders.LARVA, threat: 1, damage: 0, src: ImageSrc.LARVA, id: Intruders.LARVA + '_i1' },
// 	{ name: Intruders.LARVA, threat: 1, damage: 0, src: ImageSrc.LARVA, id: Intruders.LARVA + '_i2' },
// 	{ name: Intruders.BLANK, threat: 0, damage: 0, src: ImageSrc.BLANK, id: Intruders.BLANK + '_i1' }
// ];

// console.log({ ALL_INTRUDERS });

// const initial: GameState = {
// 	inBag: JSON.parse(JSON.stringify(ALL_INTRUDERS)),
// 	players: 3,
// 	inPlay: [],
// 	developing: [],
// 	encounter: [],
// 	version: 4
// };

// let previous: GameState = initial;

// if (browser && localStorage?.getItem('game')) {
// 	const stored = JSON.parse(localStorage.getItem('game') as string);
// 	if (stored.version === previous.version) {
// 		previous = stored;
// 	} else {
// 		console.log('Version update');
// 	}
// 	console.log({ startingGameWith: previous });
// }

// const gameState = writable<GameState>(previous);
// export const reset = () => {
// 	gameState.set(initial);
// 	if (browser && localStorage?.getItem('game')) {
// 		localStorage.setItem('game', JSON.stringify(initial));
// 	}
// };

// export default gameState;
