let inputElement = document.getElementById('input');
let outputElement = document.getElementById('output');
let infoElement = document.querySelector('.info');
let eButton = document.getElementById('encrypt');
let dButton = document.getElementById('desencrypt');
let cButton = document.getElementById('copy');
let outputContainer = document.querySelector('.output-container');

function doEncrypt(text) {
  let result = [];

  Array.from(text).forEach(letter => {
    let unicode = letter.charCodeAt(0);

    if (unicode == 32) return result.push(' ');

    if (unicode < 97 || unicode > 122) {
      throw Error('El ingreso de datos no es  correcto');
    }

    if (unicode == 97) return result.push('enter');
    if (unicode == 101) return result.push('imes');
    if (unicode == 105) return result.push('ai');
    if (unicode == 111) return result.push('ober');
    if (unicode == 117) return result.push('ufat');

    result.push(String.fromCharCode(unicode));
  });

  return result.join('');
}

function doDesencrypt(text) {
  let result = '';

  result = text
    .replaceAll('enter', 'a')
    .replaceAll('imes', 'e')
    .replaceAll('ai', 'i')
    .replaceAll('ober', 'o')
    .replaceAll('ufat', 'u');

  return result;
}

function mostrarError() {
  infoElement.classList.add('info-error');
}

function paintResults(value) {
  infoElement.classList.remove('info-error');
  outputContainer.classList.add('output-container-true');

  outputContainer.innerHTML = `
        <p id="output" class="output-text">
         ${value}
        </p>

        <button class="copy secondary-button" id="copy">Copiar</button>
        `;
}

eButton.addEventListener('click', e => {
  if (inputElement.value == '') return;
  paintResults(doEncrypt(inputElement.value));
});

dButton.addEventListener('click', e => {
  if (inputElement.value == '') return;
  paintResults(doDesencrypt(inputElement.value));
});

outputContainer.addEventListener('click', e => {
  if (e.target.classList.contains('copy')) {
    navigator.clipboard.writeText(document.getElementById('output').innerText);
  }
});
