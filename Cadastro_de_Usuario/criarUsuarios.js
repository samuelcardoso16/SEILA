const API_URL = "http://127.0.0.1:5000";

async function CriarUsuario(){
    try {
        let formNome= document.getElementById('usuario_nome').value
        let formEmail= document.getElementById('usuario_email').value
        let formIdade= parseInt.getElementById('usuario_idade').value
        let formAltura= parseFloat.getElementById('usuario_altura').value

        const response = await fetch(`${API_URL}/usuarios/${userID}`, { 
            method: "POST",
            headers: { "Content-type": "application/json"},
            bod: JSON.stringify({
                nome: formNome,
                email: formEmail,
                idade: formIdade, 
                altura: formAltura
            })
        });

        if (!response.ok) throw new Error("Erro ao deletar o usuário");
        window.location.replace("usuarios.html");
    } catch (error) {
        
    }
}
