document.documentElement.className = 'theme-light';
export function setTheme() {
  //get theme from selector.
  //set it to the page
  //send it to local storege.
  console.log('Style changed');
  const themeName = document.getElementById('theme').value;
  document.documentElement.className = themeName;
}
