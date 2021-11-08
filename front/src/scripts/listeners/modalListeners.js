import { addPerson } from '../api/api';
import { loadTable } from '../dom/loadTable';

const nameInput = document.querySelector('.name-input');
const numberInput = document.querySelector('.number-input');

export function onCloseClick(event) {
  $('#addModal').modal('hide');
  clearInputs();
}

export async function onAddModalClick(event) {
  const name = nameInput.value;
  const number = numberInput.value;
  const res = await addPerson(name, number);
  if (res) {
    loadTable();
    $('#addModal').modal('hide');
  }
  clearInputs();
}

function clearInputs() {
  numberInput.value = '';
  nameInput.value = '';
}
