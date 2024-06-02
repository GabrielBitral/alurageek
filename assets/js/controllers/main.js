import { productService } from '../services/product-service.js';

const containerProdutos = document.querySelector('[data-lista]');
const spanSemProdutos = document.querySelector('.mensagem__sem__produtos');
const botaoLimpar = document.getElementById('botao__limpar');

const constroiCard = (id, nome, valor, imagem) => {
    const produto = document.createElement('li');
    produto.classList.add('card__produto');
    produto.innerHTML = `
        <img class="foto__produto" src="${imagem}" alt="Visual do produto">
        <input data-id value=${id} style="display:none;">
        <p class="titulo__produto">${nome}</p>
        <div class="infos__produto">
            <span class="preco__produto">R$ ${transformarValor(valor)}</span>
            <button class="botao__deletar__produto" data-button-excluir><img class="icone__deletar" src="assets/img/del.png" alt="Excluir produto"></button>
        </div>
    `;
    containerProdutos.appendChild(produto);
};

const listarProdutos = async () => {
    try {
        const produtos = await productService.buscarProdutos();
        spanSemProdutos.style.display = 'none';
        produtos.forEach(produto => {
            constroiCard(produto.id, produto.nome, produto.valor, produto.imagem);
        });
        adicionarEventosBotaoExcluir();
    } catch (e) {
        alert("Não foi possível buscar os produtos.");
        spanSemProdutos.style.display = 'block';
        containerProdutos.style.overflow = 'hidden';
    }
};

function transformarValor(valor) {
    const valorTransformado = valor.toFixed(2).replace('.', ',');
    return valorTransformado;
}

function adicionarEventosBotaoExcluir() {
    const botoesExcluir = document.querySelectorAll('[data-button-excluir]');

    botoesExcluir.forEach(botao => {
        botao.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const id = botao.parentNode.parentNode.querySelector('[data-id]').value;
            try {
                await productService.excluirProduto(id);
            } catch (e) {
                alert("Não foi possível excluir o produto");
            }
        })
    })
};

botaoLimpar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => input.value = '');
})

listarProdutos();