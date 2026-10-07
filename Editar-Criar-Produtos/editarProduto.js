const API_URL = "http://127.0.0.1:5000";

const urlParams = new URLSearchParams(window.location.search);
const produtoID = urlParams.get('id');

async function carregarDadosProduto() {
    if (!produtoID) {
        window.location.replace("produtos.html");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/produtos/${produtoID}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do produto");
        
        const produto = await response.json();

        document.getElementById('editar_nome').value = produto.nome;
        document.getElementById('editar_preco').value = produto.preco;
        document.getElementById('editar_quantidade').value = produto.quantidade;
    } catch (error) {
        console.error(error);
    }
}

async function atualizarProduto() {
    const formNome = document.getElementById('editar_nome').value;
    const formPreco = parseFloat(document.getElementById('editar_preco').value);
    const formQuantidade = parseInt(document.getElementById('editar_quantidade').value);

    try {
        const response = await fetch(`${API_URL}/produtos/${produtoID}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                nome: formNome,
                preco: formPreco,
                quantidade: formQuantidade
            })
        });

        if (!response.ok) throw new Error("Erro ao atualizar o produto");
        window.location.replace("produtos.html");
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", carregarDadosProduto);
