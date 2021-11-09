const searchInput = document.querySelector('.search');
export function onSearchInput(event) {
  const searchQuery = String(searchInput.value).toLowerCase();
  hideRows(searchQuery);
}

function hideRows(searchQuery) {
  const rows = document.querySelectorAll('tr');
  let first = true;
  for (const row of rows) {
    if (first) {
      first = false;
      continue;
    }
    const name = row.children[1].innerText;
    const number = row.children[2].innerText;
    row.hidden =
      !name.toLowerCase().match(searchQuery) &&
      !number.toLowerCase().match(searchQuery);
    // row.hidden
  }
}

