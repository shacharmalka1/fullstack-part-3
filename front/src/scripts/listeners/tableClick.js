import { deletePerson } from '../api/api';
import { loadTable } from '../dom/loadTable';
import iziToast from 'izitoast';

export async function onTableClick(event) {
  if (event.target.classList.contains('delete')) {
    const id = event.target.dataset.id;
    const res = await deletePerson(id);
    if (res) {
      iziToast.error({
        title: 'Number',
        message: 'Deleted',
      });
      loadTable();
    }
  }
}
