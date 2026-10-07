const API_URL = "http://127.0.0.1:5000";

async function criarPedidos() {
    try {
        let formQuantidade = parseInt(document.getElementById('pedido_quantidade').value);
        let formTotal = parseFloat(document.getElementById('pedido_total').value);
        let formIdUsuario = parseInt(document.getElementById('pedido_id_usuario').value);
        let formIdProduto = parseInt(document.getElementById('pedido_id_produto').value);

        const response = await fetch(`${API_URL}/pedidos`, { 
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                quantidade: formQuantidade,
                total: formTotal,
                id_usuario: formIdUsuario, 
                id_produto: formIdProduto
            })
        });

        if (!response.ok) throw new Error("Erro ao criar o pedido");
        window.location.replace("pedidos.html");
    } catch (error) {
        console.error(error);
    }
}
