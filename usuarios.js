const API_URL = "http://127.0.0.1:5000"

async function carregarUsuarios(){
    try {
        const response=await fetch(`${API_URL}/usuarios`);
        if (!response.ok) throw 
        new Error("Error ao carregar usuários")

        const usuarios= await response.json()
        const tbody= document.querySelector("#tabelaUsuarios tbody")

        tbody.innerHTML =""
    } catch (error) {
        
    }


}
