import { writable } from 'svelte/store';


// Check if running on the client side
const isClient = typeof window !== 'undefined';

// Initialize with 0 if on the server side
const initialDepth = isClient ? JSON.parse(localStorage.getItem('depth') || '0') : 0;
const initialFocus = isClient ? localStorage.getItem('focus') || '' : '';
const initialPath = isClient ? JSON.parse(localStorage.getItem('path') || '[]') : [];
const initialBook = isClient ? JSON.parse(localStorage.getItem('book') || '[]') : [];

export const depth = writable(initialDepth);

export const focus = writable(initialFocus);

export const path = writable<string[]>(initialPath);

export const book = writable<string[]>(initialBook);

export const addItem = (item: string) => {
  path.update((items) => [...items, item]);
};

export const addBook = (item: string) => {
  book.update((items) => [...items, item]);
};

//remove a book with a given name from the book list
export const removeBook = (itemName: string) => {
  book.update((books) => books.filter(book => book !== itemName));
};

// Ensure localStorage is available before subscribing and updating
if (isClient) {
  path.subscribe((val) => localStorage.setItem('path', JSON.stringify(val)));
  book.subscribe((val) => localStorage.setItem('book', JSON.stringify(val)));
  depth.subscribe((val) => localStorage.setItem('depth', JSON.stringify(val)));
  focus.subscribe((val) => localStorage.setItem('focus', val));
}
