import { addPerson } from '../api/api';
import { loadTable } from '../dom/loadTable';

const nameInput = document.querySelector('.name-input');
const numberInput = document.querySelector('.number-input');
const myModal = document.querySelector('#addModal');

export function onCloseClick(event) {
  myModal.style.display = 'none';
  clearInputs();
}

export async function onAddModalClick(event) {
  const name = nameInput.value;
  const number = numberInput.value;
  const res = await addPerson(name, number);
  if (res) {
    loadTable();
    myModal.style.display = 'none';
  }
  clearInputs();
}

function clearInputs() {
  numberInput.value = '';
  nameInput.value = '';
}
