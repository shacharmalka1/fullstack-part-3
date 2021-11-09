document.documentElement.className = 'theme-light';
export function setTheme() {
  //get theme from selector.
  //set it to the page
  //send it to local storege.
  console.log('Style changed');
  const themeName = document.getElementById('theme').value;
  if (themeName === 'theme-freestyle') changeCssColors();
  else revertCSS(themeName);
  document.documentElement.className = themeName;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function changeCssColors() {
  document.documentElement.style.setProperty('--color-title', randomColor());
  document.documentElement.style.setProperty('--color-table', randomColor());
  document.documentElement.style.setProperty('--color-buttons', randomColor());
  document.documentElement.style.setProperty('--font-color', randomColor());
}

function revertCSS(style) {
  if (style === 'theme-dark') {
    document.documentElement.style.setProperty('--color-title', 'white');
    document.documentElement.style.setProperty('--color-table', 'white');
    document.documentElement.style.setProperty('--color-buttons', '#1da1f2');
    document.documentElement.style.setProperty('--font-color', 'black');
  } else {
    document.documentElement.style.setProperty(
      '--color-title',
      'rgb(22, 18, 18)'
    );
    document.documentElement.style.setProperty('--color-table', 'black');
    document.documentElement.style.setProperty('--color-buttons', '#1da1f2');
    document.documentElement.style.setProperty('--font-color', 'white');
  }
}
