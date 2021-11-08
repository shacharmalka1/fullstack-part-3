import { onAddClick } from './addClick';
import { onCloseClick, onAddModalClick } from './modalListeners';
import { onSearchInput } from './searchChange';
import { onTableClick } from './tableClick';

const table = document.querySelector('tbody');
const addButton = document.querySelector('.add');
const closeModal = document.querySelectorAll('.modalClose');
const addModal = document.querySelector('.modalAdd');
const search = document.querySelector('.search');
export function listen() {
  table.addEventListener('click', onTableClick);
  addButton.addEventListener('click', onAddClick);
  for (const b of closeModal) {
    b.addEventListener('click', onCloseClick);
  }
  addModal.addEventListener('click', onAddModalClick);
  search.addEventListener('input', onSearchInput);
}
