const API_URL = "http://127.0.0.1:5000";

const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('id');

async function carregarDadosUsuario() {
    if (!userID) {
        window.location.replace("usuarios.html");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${userID}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
        
        const usuario = await response.json();

        document.getElementById('editar_nome').value = usuario.nome;
        document.getElementById('editar_email').value = usuario.email;
        document.getElementById('editar_idade').value = usuario.idade;
        document.getElementById('editar_altura').value = usuario.altura;
    } catch (error) {
        console.error(error);
    }
}

async function atualizarUsuario() {
    const formNome = document.getElementById('editar_nome').value;
    const formEmail = document.getElementById('editar_email').value;
    const formIdade = parseInt(document.getElementById('editar_idade').value);
    const formAltura = parseFloat(document.getElementById('editar_altura').value);

    try {
        const response = await fetch(`${API_URL}/usuarios/${userID}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                nome: formNome,
                email: formEmail,
                idade: formIdade,
                altura: formAltura
            })
        });

        if (!response.ok) throw new Error("Erro ao atualizar o usuário");
        window.location.replace("usuarios.html");
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", carregarDadosUsuario);
