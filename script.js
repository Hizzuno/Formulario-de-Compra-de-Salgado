
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbwsbM6g73BFFXHH12L_Ywzq0L6F-5gxM6DgOlZEk7wcAvSVZhaBQ72sstxDRsYpiQcMvA/exec";

const formulario = document.getElementById('meu-formulario');
const headerContainer = document.querySelector('.header-container');
const radiosQuantidade = document.querySelectorAll('input[name="quantidade"]');
const campoPersonalizado = document.getElementById('campo-personalizado');
const inputPersonalizado = document.getElementById('qtd_personalizada');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

radiosQuantidade.forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.id === '200') {
      campoPersonalizado.classList.remove('escondido');
      inputPersonalizado.setAttribute('required', 'true');
    } else {
      campoPersonalizado.classList.add('escondido');
      inputPersonalizado.removeAttribute('required');
      inputPersonalizado.value = '';
    }
  });
});

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const radioSelecionado = document.querySelector('input[name="quantidade"]:checked');
  let qtdFinal = radioSelecionado ? radioSelecionado.value : '';

  if (radioSelecionado && radioSelecionado.id === '200') {
    qtdFinal = inputPersonalizado.value;
  }

  const dadosDoPedido = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    quantidade: qtdFinal
  };

  fetch(URL_GOOGLE_SCRIPT, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosDoPedido)
  });

  formulario.classList.add('escondido');
  headerContainer.classList.add('escondido');
  mensagemSucesso.classList.remove('escondido');

  setTimeout(function() {
    formulario.reset();
    campoPersonalizado.classList.add('escondido');
    inputPersonalizado.removeAttribute('required');
    mensagemSucesso.classList.add('escondido');
    headerContainer.classList.remove('escondido');
    formulario.classList.remove('escondido');
  }, 5000);
});