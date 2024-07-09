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

    if (unicode == 32) {
      result.push(String.fromCharCode(unicode));
      return;
    }

    if (unicode < 97 || unicode > 122) {
      mostrarError();
      throw Error('El ingreso de datos no es  correcto');
    }

    result.push(String.fromCharCode(unicode + 2));
    result.push(String.fromCharCode(unicode + 3));
  });

  return result.join('');
}

function doDesencrypt(text) {
  let result = [];
  let even = true;

  Array.from(text).forEach((letter, i) => {
    let unicode = letter.charCodeAt(0);

    // console.log(unicode, i);

    if (unicode == 32) {
      result.push(String.fromCharCode(unicode));
      even = !even;
      console.log(even);
      return;
    }

    if (unicode < 97 || unicode > 125) {
      throw Error('El ingreso de datos no es  correcto');
    }

    if (even) {
      if (i % 2 == 0) return;
    } else {
      if (i % 2 == 1) return;
    }

    result.push(String.fromCharCode(unicode - 3));
  });

  return result.join('');
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
    console.log('test');
    navigator.clipboard.writeText(document.getElementById('output').innerText);
  }
});
