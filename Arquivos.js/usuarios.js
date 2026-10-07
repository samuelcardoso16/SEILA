const API_URL = "http://127.0.0.1:5000";

async function carregarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (!response.ok) throw new Error("Erro ao carregar usuários");
        
        const usuarios = await response.json();
        const tbody = document.querySelector("#tabelaUsuarios tbody");
        
        tbody.innerHTML = "";

        usuarios.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.idade}</td>
                <td>${user.altura}</td>
                <td>
                    <button class="btn btn-warning" onclick="redirecionarParaEdicao(${user.id})">Editar</button>
                    <a class="btn btn-danger" onclick="deletarUsuario(${user.id})">Apagar</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

function redirecionarParaEdicao(userID) {
    window.location.href = `editarUsuario.html?id=${userID}`;
}

async function deletarUsuario(userID) {
    try {
        const response = await fetch(`${API_URL}/usuarios/${userID}`, { 
            method: "DELETE",
            headers: { "Content-type": "application/json"}
        });

        if (!response.ok) throw new Error("Erro ao deletar o usuário");
        window.location.replace("usuarios.html");
    } catch (error) {
        alert("Erro: " + error.message);
    }
} 

carregarUsuarios();
