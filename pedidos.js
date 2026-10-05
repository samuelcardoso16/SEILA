const API_URL = "http://127.0.0.1:5000"

async function carregarPedidos(){
    try {
        const response = await fetch(`${API_URL}/pedidos`);

        if (!response.ok) throw new Error("Erro ao carregar pedidos")

        const pedidos = await response.json()
        const tbody = document.querySelector("#tabelaPedidos tbody")

        tbody.innerHTML = ""

        pedidos.forEach(pedido => {
            const tr = document.createElement("tr")

            tr.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.total}</td>
                <td>${pedido.usuario_id}</td>
                <td>${pedido.produto_id}</td>
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

carregarPedidos()
