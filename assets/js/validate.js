import { productService } from "./services/product-service.js";
import ehValorValido from "./valida-valor.js";

const camposFormulario = document.querySelectorAll('input[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const listaRespostas = {
        'nome': e.target.elements['nome'].value,
        'valor': e.target.elements['valor'].value,
        'imagem': e.target.elements['imagem'].value,
    }

    const valorTransformado = parseFloat(listaRespostas.valor.replace(',', '.'));
    try {
        await productService.cadastrarProduto(listaRespostas.nome, valorTransformado, listaRespostas.imagem);
    } catch (e) {
        alert("Não foi possível cadastrar o produto");
    }
})

camposFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
});

const tiposDeErro = [
    'valueMissing',
    'tooShort',
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
    },
    valor: {
        valueMissing: "O campo valor não pode estar vazio.",
        customError: 'Insira um valor válido.'
    },
    imagem: {
        valueMissing: "O campo imagem não pode estar vazio.",
    }
};

function verificaCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity('');

    if (campo.name == 'valor') {
        ehValorValido(campo);
    }

    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });
    
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = '';
    }
}