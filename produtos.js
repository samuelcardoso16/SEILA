const API_URL = "http://127.0.0.1:5000"

async function carregarProdutos(){
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error("Erro ao carregar produtos")

        const produtos = await response.json()
        const tbody = document.querySelector("#tabelaProdutos tbody")

        tbody.innerHTML = ""

        produtos.forEach(produto => {
            const tr = document.createElement("tr")

            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidade}</td>
                <td>
                    <a class="btn btn-danger">Apagar</a>
                </td>
            `

            tbody.appendChild(tr)
        });
    } catch (error) {
        alert("Erro: " + error.message)
    }
}

carregarProdutos()
