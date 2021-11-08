import { onAddClick } from './addClick';
import { onCloseClick, onAddModalClick } from './modalListeners';
import { onTableClick } from './tableClick';
import { searchChange } from './searchChange';

const table = document.querySelector('tbody');
const addButton = document.querySelector('.add');
const closeModal = document.querySelectorAll('.modalClose');
const addModal = document.querySelector('.modalAdd');
export function listen() {
  table.addEventListener('click', onTableClick);
  addButton.addEventListener('click', onAddClick);
  search.addEventListener('input', searchChange);
  for (const b of closeModal) {
    b.addEventListener('click', onCloseClick);
  }
  addModal.addEventListener('click', onAddModalClick);
}
