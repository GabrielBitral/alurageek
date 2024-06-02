const buscarProdutos = async () => {
    const listaProdutos = await fetch('http://localhost:3000/produtos');
    const listaProdutosConvertida = await listaProdutos.json();
    return listaProdutosConvertida;
};

const cadastrarProduto = async (nome, valor, imagem) => {
    const adicionarProduto = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            nome,
            valor,
            imagem
        })
    });

    if (!adicionarProduto.ok) {
        throw new Error("Não foi possível cadastrar o produto");
    }
};

const excluirProduto = async (id) => {
    const deletarProduto = await fetch(`http://localhost:3000/produtos/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (!deletarProduto.ok) {
        throw new Error("Não foi possível excluir o produto");
    }
};

export const productService = {
    buscarProdutos,
    cadastrarProduto,
    excluirProduto
}