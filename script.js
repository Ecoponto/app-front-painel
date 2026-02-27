// Elementos existentes
const telaInicial = document.getElementById('tela-inicial');
const telaProcesso = document.getElementById('tela-processo');
const loadingContainer = document.getElementById('loading-container');
const acaoContainer = document.getElementById('acao-container');
const qrcodeContainer = document.getElementById('qrcode-container');
const aplhanumericContainer = document.getElementById('alphanumeric-container');

const btnIniciar = document.getElementById('btn-iniciar');
const btnResgatar = document.getElementById('btn-resgatar');
const btnNaoResgatar = document.getElementById('btn-nao-resgatar');

const TEMPO_VALIDO_QRCODE = 300000; // 5 minutos para teste

function createAlphaNumericCod(size) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < size; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

btnIniciar.addEventListener('click', async () => {
    // 1. Troca de tela

    telaInicial.classList.add('hidden');
    telaProcesso.classList.remove('hidden');
    acaoContainer.classList.remove('hidden');

    // Limpa QR Code anterior
    qrcodeContainer.innerHTML = '';


    try {
        // 2. Requisição para a Rota X
        const response = await fetch('https://ecotank.hirameki.me/sessions/login',
        {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const data = await response.json();

        // 3. Gera o QR Code com o dado vindo da API (ex: data.id ou data.url)
        const valorCodigo = data.token;

        new QRCode(qrcodeContainer, {
            text: valorCodigo,
            width: 180,
            height: 180,
            colorDark: "#333",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        aplhanumericContainer.textContent = createAlphaNumericCod(4)


    } catch (error) {
        console.error("Erro na requisição:", error);
        qrcodeContainer.innerHTML = "<p style='color:red'>Erro ao gerar QR Code</p>";
    }

    // 4. Aguarda o tempo de processamento visual
    setTimeout(() => {
        location.reload();
    }, TEMPO_VALIDO_QRCODE);
});

