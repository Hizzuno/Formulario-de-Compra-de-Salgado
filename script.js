// Substitua pela sua URL do Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsbM6g73BFFXHH12L_Ywzq0L6F-5gxM6DgOlZEk7wcAvSVZhaBQ72sstxDRsYpiQcMvA/exec';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('snackForm');
    const radioQuantities = document.querySelectorAll('input[name="quantidade"]');
    const customQuantityGroup = document.getElementById('customQuantityGroup');
    const customQuantityInput = document.getElementById('customQuantity');
    const successMessage = document.getElementById('successMessage');
    const btnSubmit = document.getElementById('btnSubmit');

    radioQuantities.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'outro') {
                customQuantityGroup.style.display = 'block';
                customQuantityInput.required = true;
                customQuantityInput.focus();
            } else {
                customQuantityGroup.style.display = 'none';
                customQuantityInput.required = false;
                customQuantityInput.value = '';
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Enviando...';

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const tipoSalgado = document.getElementById('tipoSalgado').value;
        
        let quantidadeSelecionada = document.querySelector('input[name="quantidade"]:checked')?.value;
        if (quantidadeSelecionada === 'outro') {
            quantidadeSelecionada = customQuantityInput.value.trim();
        }

        const payload = {
            nome: nome,
            email: email,
            tipoSalgado: tipoSalgado,
            quantidade: quantidadeSelecionada
        };

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            form.style.display = 'none';
            successMessage.style.display = 'block';

            setTimeout(() => {
                form.reset();
                customQuantityGroup.style.display = 'none';
                form.style.display = 'block';
                successMessage.style.display = 'none';
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Enviar Pedido';
            }, 5000);

        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            alert('Ocorreu um erro ao enviar seu pedido. Tente novamente.');
            btnSubmit.disabled = false;
            btnSubmit.innerText = 'Enviar Pedido';
        }
    });
});