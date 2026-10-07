const API_URL = "http://127.0.0.1:5000";

const urlParams = new URLSearchParams(window.location.search);
const pedido_id = urlParams.get("id");

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

        if (!response.ok) {
            throw new Error("Erro ao carregar usuários");
        }

        const usuarios = await response.json();
        const datalist = document.getElementById("lista_usuarios");

        datalist.innerHTML = "";

        usuarios.forEach(usuario => {
            const option = document.createElement("option");
            option.value = usuario.nome;
            option.dataset.id = usuario.id;
            datalist.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os usuários.");
    }
}

async function carregarSugestoesProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);

        if (!response.ok) {
            throw new Error("Erro ao carregar produtos");
        }

        const produtos = await response.json();
        const datalist = document.getElementById("lista_produtos");

        datalist.innerHTML = "";

        produtos.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.nome;
            option.dataset.id = produto.id;
            datalist.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os produtos.");
    }
}

async function carregarDadosPedido() {
    try {
        const response = await fetch(`${API_URL}/pedidos/${pedido_id}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do pedido");
        }

        const pedido = await response.json();

        document.getElementById("editar_quantidade").value =
            pedido.quantidade ?? "";

        document.getElementById("editar_total").value =
            pedido.total ?? "";

        document.getElementById("editar_usuario_id").value =
            pedido.usuario_id ?? "";

        document.getElementById("editar_produto_id").value =
            pedido.produto_id ?? "";

        if (pedido.usuario_id) {
            const opcaoUsuario = document.querySelector(
                `#lista_usuarios option[data-id="${pedido.usuario_id}"]`
            );

            if (opcaoUsuario) {
                document.getElementById("buscar_usuario").value =
                    opcaoUsuario.value;
            }
        }

        if (pedido.produto_id) {
            const opcaoProduto = document.querySelector(
                `#lista_produtos option[data-id="${pedido.produto_id}"]`
            );

            if (opcaoProduto) {
                document.getElementById("buscar_produto").value =
                    opcaoProduto.value;
            }
        }

    } catch (error) {
        console.error(error);
        alert("Não foi possível carregar o pedido.");
    }
}

function configurarEventosDatalist() {
    const campoUsuario = document.getElementById("buscar_usuario");

    campoUsuario.addEventListener("input", function () {
        const valor = this.value;
        const opcoes = document.querySelectorAll("#lista_usuarios option");

        let idUsuario = "";

        opcoes.forEach(opcao => {
            if (opcao.value === valor) {
                idUsuario = opcao.dataset.id;
            }
        });

        document.getElementById("editar_usuario_id").value = idUsuario;
    });

    const campoProduto = document.getElementById("buscar_produto");

    campoProduto.addEventListener("input", function () {
        const valor = this.value;
        const opcoes = document.querySelectorAll("#lista_produtos option");

        let idProduto = "";

        opcoes.forEach(opcao => {
            if (opcao.value === valor) {
                idProduto = opcao.dataset.id;
            }
        });

        document.getElementById("editar_produto_id").value = idProduto;
    });
}

async function atualizarPedido() {
    const quantidade = parseInt(
        document.getElementById("editar_quantidade").value
    );

    const total = parseFloat(
        document.getElementById("editar_total").value
    );

    const usuario_id = parseInt(
        document.getElementById("editar_usuario_id").value
    );

    const produto_id = parseInt(
        document.getElementById("editar_produto_id").value
    );

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida.");
        return;
    }

    if (isNaN(total) || total < 0) {
        alert("Informe um total válido.");
        return;
    }

    if (isNaN(usuario_id)) {
        alert("Selecione um usuário válido.");
        return;
    }

    if (isNaN(produto_id)) {
        alert("Selecione um produto válido.");
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/pedidos/${pedido_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantidade: quantidade,
                    total: total,
                    usuario_id: usuario_id,
                    produto_id: produto_id
                })
            }
        );

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(
                erro || "Erro ao atualizar o pedido"
            );
        }

        alert("Pedido atualizado com sucesso!");
        window.location.replace("pedidos.html");

    } catch (error) {
        console.error(error);
        alert("Erro ao salvar o pedido: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", iniciarPagina);