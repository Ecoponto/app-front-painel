// Elementos existentes
const telaInicial = document.getElementById('tela-inicial');
const telaProcesso = document.getElementById('tela-processo');
const loadingContainer = document.getElementById('loading-container');
const acaoContainer = document.getElementById('acao-container');
const qrcodeContainer = document.getElementById('qrcode-container');

const btnIniciar = document.getElementById('btn-iniciar');
const btnResgatar = document.getElementById('btn-resgatar');
const btnNaoResgatar = document.getElementById('btn-nao-resgatar');

const TEMPO_VALIDO_QRCODE = 300000; // 5 minutos para teste

btnIniciar.addEventListener('click', async () => {
    // 1. Troca de tela

    telaInicial.classList.add('hidden');
    telaProcesso.classList.remove('hidden');
    acaoContainer.classList.remove('hidden');

    // Limpa QR Code anterior
    qrcodeContainer.innerHTML = '';


    try {
        // 2. Requisição para a Rota X
        const response = await fetch('http://192.168.1.80:5000/token-session/cycle/start',
        {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const data = await response.json();

        // 3. Gera o QR Code com o dado vindo da API (ex: data.id ou data.url)
        const valorCodigo = data.tokenSession;
        console.log("Valor para QR Code:", valorCodigo); // Verifique o valor recebido

        new QRCode(qrcodeContainer, {
            text: valorCodigo,
            width: 180,
            height: 180,
            colorDark: "#333",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

    } catch (error) {
        console.error("Erro na requisição:", error);
        qrcodeContainer.innerHTML = "<p style='color:red'>Erro ao gerar QR Code</p>";
    }

    // 4. Aguarda o tempo de processamento visual
    setTimeout(() => {
        location.reload();
    }, TEMPO_VALIDO_QRCODE);
});

