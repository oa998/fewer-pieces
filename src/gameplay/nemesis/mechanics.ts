/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
	DevelopmentRules,
	Intruders,
	newGame,
	putRandomIntruderIntoBag,
	type GameState,
	type IntruderToken
} from './GameState';

function storeLocal(key: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = function (this: any, gs: GameState, ...args: any[]) {
			const gsCopy = JSON.parse(JSON.stringify(gs));
			const result = originalMethod.apply(this, [gsCopy, ...args]);
			localStorage.setItem(key, JSON.stringify(result));
			return result;
		};

		return descriptor;
	};
}

class Mechanics {
	@storeLocal('game')
	develop(gs: GameState) {
		if (gs.inBag.length === 0) return gs;
		if (gs.developing.length > 0) return gs;
		const intruder = gs.inBag.popRandom() as IntruderToken;
		gs.developing.push(intruder);
		return gs;
	}

	@storeLocal('game')
	developEnd(gs: GameState) {
		if (gs.developing.length === 0) return gs;
		return DevelopmentRules[gs.developing[0].name].action(gs);
	}

	@storeLocal('game')
	encounter(gs: GameState) {
		if (gs.inBag.length === 0) return gs;
		// Should never be able to pop a null token here - should always have at least a blank token in bag
		const intruder = JSON.parse(JSON.stringify(gs.inBag.popRandom() as IntruderToken));
		gs.encounter = [intruder]; // Always save over encounter. Only one at a time.
		return gs;
	}

	@storeLocal('game')
	encounterDone(gs: GameState) {
		if (gs.encounter.length === 0) return gs;
		const lastEncounter = gs.encounter.pop() as IntruderToken;
		gs.encounter = [];
		// return the blank to the bag else put the Intruder into play
		if (lastEncounter.name === Intruders.BLANK) {
			gs.inBag.push(lastEncounter);
			putRandomIntruderIntoBag(gs, Intruders.ADULT);
		} else {
			gs.inPlay.push(lastEncounter);
		}
		return gs;
	}

	@storeLocal('game')
	kill(gs: GameState, tokenId: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		const intruder = gs.inPlay[index];
		gs.inPlay.splice(index, 1);
		gs.dead.push(intruder);
		delete gs.clickedInPlayID;
		return gs;
	}

	@storeLocal('game')
	clickInPlayIntruder(gs: GameState, tokenId: string) {
		console.log('clicking', { tokenId });
		gs.clickedInPlayID = tokenId;
		return gs;
	}

	@storeLocal('game')
	unclickInPlayIntruder(gs: GameState) {
		console.log('unclicking', gs.clickedInPlayID);
		gs.clickedInPlayID = undefined;
		return gs;
	}

	@storeLocal('game')
	setNote(gs: GameState, tokenId: string, note?: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		gs.inPlay[index].note = note;
		return gs;
	}

	@storeLocal('game')
	changeDamage(gs: GameState, tokenId: string, damageChange: -1 | 1) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		gs.inPlay[index].damage = Math.max(0, Math.min(20, gs.inPlay[index].damage + damageChange));
		return gs;
	}

	@storeLocal('game')
	returnToBag(gs: GameState, tokenId: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		const intruder = gs.inPlay[index];
		intruder.damage = 0;
		delete intruder.note;
		gs.inPlay.splice(index, 1);
		gs.inBag.push(intruder);
		delete gs.clickedInPlayID;
		return gs;
	}

	@storeLocal('game')
	resetGame(players: GameState['players']) {
		return newGame(players);
	}
}

export default new Mechanics();
