import { onTableClick } from './tableClick';

const table = document.querySelector('tbody');

export function listen() {
  table.addEventListener('click', onTableClick);
}
