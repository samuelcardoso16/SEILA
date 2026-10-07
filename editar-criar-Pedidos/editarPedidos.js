const API_URL = "http://127.0.0.1:5000";

const urlParams = new URLSearchParams(window.location.search);
const pedido_id = urlParams.get('id');

async function iniciarPagina() {
    if (!pedido_id) {
        window.location.replace("pedidos.html");
        return;
    }

    await carregarSugestoesUsuarios();
    await carregarSugestoesProdutos();
    await carregarDadosPedido();
    configurarEventosDatalist();
}

async function carregarSugestoesUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (!response.ok) throw new Error("Erro ao carregar lista de usuários");
        
        const usuarios = await response.json();
        const datalist = document.getElementById("lista_usuarios");
        datalist.innerHTML = "";

        usuarios.forEach(user => {
            const option = document.createElement("option");
            option.value = user.nome;
            option.setAttribute("data-id", user.id);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function carregarSugestoesProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error("Erro ao carregar lista de produtos");
        
        const produtos = await response.json();
        const datalist = document.getElementById("lista_produtos");
        datalist.innerHTML = "";

        produtos.forEach(prod => {
            const option = document.createElement("option");
            option.value = prod.nome;
            option.setAttribute("data-id", prod.id);
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function carregarDadosPedido() {
    try {
        const response = await fetch(`${API_URL}/pedidos/${pedido_id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do pedido");
        
        const pedido = await response.json();

        document.getElementById('editar_quantidade').value = pedido.quantidade || 0;
        document.getElementById('editar_total').value = pedido.total || 0;
        
        // Sincronizado para buscar os IDs com a grafia correta do HTML
        document.getElementById('editar_usuario_id').value = pedido.usuario_id || "";
        document.getElementById('editar_produto_id').value = pedido.produto_id || "";

        if (pedido.usuario_id) {
            const optUser = document.querySelector(`#lista_usuarios option[data-id="${pedido.usuario_id}"]`);
            if (optUser) document.getElementById('buscar_usuario').value = optUser.value;
        }

        if (pedido.produto_id) {
            const optProd = document.querySelector(`#lista_produtos option[data-id="${pedido.produto_id}"]`);
            if (optProd) document.getElementById('buscar_produto').value = optProd.value;
        }

    } catch (error) {
        console.error(error);
    }
}

function configurarEventosDatalist() {
    document.getElementById('buscar_usuario').addEventListener('input', function() {
        const inputVal = this.value;
        const opt = document.querySelector(`#lista_usuarios option[value="${inputVal}"]`);
        // Captura o valor associando ao ID correto do HTML
        document.getElementById('editar_usuario_id').value = opt ? opt.getAttribute('data-id') : "";
    });

    document.getElementById('buscar_produto').addEventListener('input', function() {
        const inputVal = this.value;
        const opt = document.querySelector(`#lista_produtos option[value="${inputVal}"]`);
        // Captura o valor associando ao ID correto do HTML
        document.getElementById('editar_produto_id').value = opt ? opt.getAttribute('data-id') : "";
    });
}

async function atualizarPedido() {
    const formQuantidade = parseInt(document.getElementById('editar_quantidade').value);
    const formTotal = parseFloat(document.getElementById('editar_total').value);
    const form_usuario_id = parseInt(document.getElementById('editar_usuario_id').value);
    const form_produto_id = parseInt(document.getElementById('editar_produto_id').value);

    if (!form_usuario_id || !form_produto_id) {
        alert("Por favor, selecione um usuário e um produto válidos da lista de sugestões.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/pedidos/${pedido_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                quantidade: formQuantidade,
                total: formTotal,
                usuario_id: form_usuario_id,
                produto_id: form_produto_id
            })
        });

        if (!response.ok) throw new Error("Erro ao atualizar o pedido");
        window.location.replace("pedidos.html");
    } catch (error) {
        alert("Erro ao salvar: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", iniciarPagina);
