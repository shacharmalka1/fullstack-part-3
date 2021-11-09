import { getPersons } from '../api/api';

const table = document.querySelector('tbody');

export async function loadTable() {
  table.innerHTML = ''
  const res = await getPersons();
  const persons = res.data;
  let i = 0;
  for (const person of persons) {
    const row = createTableRow(person, i);
    table.appendChild(row);
    i++;
  }
}

export function createTableRow(person, count) {
  //Create table row
  const row = document.createElement('tr');
  const head = document.createElement('th');
  const name = document.createElement('td');
  const number = document.createElement('td');
  const deleteBtn = document.createElement('button');

  head.setAttribute('scope', 'row');
  head.innerText = count;
  name.innerText = person.name;
  number.innerText = person.number;
  number.setAttribute('class', 'number');
  deleteBtn.classList.add('delete');
  deleteBtn.innerText = '❌';
  deleteBtn.dataset.id = person.id;
  row.appendChild(head);
  row.appendChild(name);
  row.appendChild(number);
  row.appendChild(deleteBtn);
  return row;
}
