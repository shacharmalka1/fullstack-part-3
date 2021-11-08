import { getPersons } from "../api/api";
import { onTableClick } from "./tableClick";
import { createTableRow } from "../dom/loadTable";

export async function searchChange(e) {
    const res = await getPersons()
    const personsArr = res.data.filter(a => a.name.includes(search.value))
    const table = document.querySelector('tbody');
    table.innerHTML = ''
    let i = 0;
    for (const person of personsArr) {
        const row = createTableRow(person, i);
        table.appendChild(row);
        i++;
    }

}