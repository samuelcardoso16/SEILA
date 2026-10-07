const API_URL = "http://127.0.0.1:5000";

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error("Erro ao carregar produtos");
        
        const produtos = await response.json();
        const tbody = document.querySelector("#tabelaProdutos tbody");
        
        tbody.innerHTML = "";

        produtos.forEach(prod => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.nome}</td>
                <td>${prod.preco}</td>
                <td>${prod.quantidade}</td>
                <td>
                    <button class="btn btn-warning" onclick="redirecionarParaEdicao(${prod.id})">Editar</button>
                    <a class="btn btn-danger" onclick="deletarProduto(${prod.id})">Apagar</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

function redirecionarParaEdicao(produtoID) {
    window.location.href = `editarProduto.html?id=${produtoID}`;
}

async function deletarProduto(produtoID) {
    try {
        const response = await fetch(`${API_URL}/produtos/${produtoID}`, { 
            method: "DELETE",
            headers: { "Content-type": "application/json"}
        });

        if (!response.ok) throw new Error("Erro ao deletar o produto");
        window.location.replace("produtos.html");
    } catch (error) {
        alert("Erro: " + error.message);
    }
} 

carregarProdutos();
