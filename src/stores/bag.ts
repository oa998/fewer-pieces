import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let previous;
if (browser && localStorage?.getItem('game')) {
	previous = JSON.parse(localStorage.getItem('game') as string);
	console.log({ previous });
} else {
	previous = { abc: 1 };
}

export default writable(previous);
