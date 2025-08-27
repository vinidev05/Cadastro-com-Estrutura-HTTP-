const base = "https://crudcrud.com/api/08a1b9b996ee4ef9b1a34d3f1aa42abd/clientes"

const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

//Carregar lista de clientes cadastrados
document.addEventListener ("DOMContentLoaded", carregarClientes);

//Cadastrar Cliente
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    
    if (!nome || !email) {
        alert("Preencha todos os campos");
        return;
    }
    
    await cadastrarCliente({ nome, email });
    form.reset();
    carregarClientes();
})

//função get (listar clientes)
async function listarClientes(){
    const resp = await fetch(base);
    return resp.json();
}

//função post (cadastrar)
async function cadastrarCliente(cliente) {
    await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });
}

//função delete (excluir)
async function excluirCliente(id){
    await fetch(`${base}/${id}`, {method: "DELETE"});
}

//Renderizar na tela
async function carregarClientes() {
    const clientes = await listarClientes();
    lista.innerHTML = "";
    
    clientes.forEach(c =>{
        const li = document.createElement("li");
        li.innerHTML = `${c.nome} - ${c.email}
        <button onclick="remover('${c._id}')">Excluir</button>`;
        lista.appendChild(li);
    });
}

//Wrapper para chamar a exclusão e recarregar a lista
async function remover(id) {
    await excluirCliente(id);
    carregarClientes();
}

