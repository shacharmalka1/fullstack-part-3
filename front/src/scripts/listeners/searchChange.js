const searchInput = document.querySelector('.search');
export function onSearchInput(event) {
  const searchQuery = String(searchInput.value).toLowerCase();
  hideRows(searchQuery);
}

function hideRows(searchQuery) {
  const rows = document.querySelectorAll('tr');
  for (const row of rows) {
    const name = row.children[1].innerText;
    const number = row.children[2].innerText;
    row.hidden =
      !name.toLowerCase().match(searchQuery) &&
      !number.toLowerCase().match(searchQuery);
    // row.hidden
  }
}
