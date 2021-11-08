import { deletePerson } from '../api/api';
import { loadTable } from '../dom/loadTable';

export async function onTableClick(event) {
  if (event.target.classList.contains('delete')) {
    const id = event.target.dataset.id;
    const res = await deletePerson(id);
    if (res) {
      // alert('Deleted!');
      loadTable();
    }
  }
}
