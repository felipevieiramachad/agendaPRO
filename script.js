let tarefas = [];

function adicionarTarefa() {
    const tituloInput = document.getElementById("titulo");
    const descricaoInput = document.getElementById("descricao");

    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();

    if (titulo === "") {
        alert("O título é obrigatório!");
        return;
    }

    if (tarefas.some(t => t.titulo.toLowerCase() === titulo.toLowerCase())) {
        alert("Já existe uma tarefa com esse título!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo,
        descricao,
        concluida: false
    };

    tarefas.push(tarefa);
    atualizarLista();

    tituloInput.value = "";
    descricaoInput.value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        } else {
            li.classList.add("pendente");
        }

        li.innerHTML = `
            <div class="texto">
                <strong>${tarefa.titulo}</strong><br><br>
                <small>${tarefa.descricao || ""}</small>
            </div>

            <div class="acoes">
                <button class="btn-concluir" onclick="marcarConcluida(${tarefa.id})">
                    Concluir
                </button>

                <button class="btn-pendente" onclick="marcarPendente(${tarefa.id})">
                    Pendente
                </button>

                <button class="btn-editar" onclick="editarTarefa(${tarefa.id})">
                    Editar
                </button>

                <button class="btn-excluir" onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(li);
    });
}

function marcarConcluida(id) {
    const tarefa = tarefas.find(t => t.id === id);
    tarefa.concluida = true;
    atualizarLista();
}

function marcarPendente(id) {
    const tarefa = tarefas.find(t => t.id === id);
    tarefa.concluida = false;
    atualizarLista();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    atualizarLista();
}

function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    const novoTitulo = prompt("Novo título:", tarefa.titulo);
    if (!novoTitulo || novoTitulo.trim() === "") {
        alert("Título não pode ser vazio!");
        return;
    }

    if (tarefas.some(t => t.titulo.toLowerCase() === novoTitulo.toLowerCase() && t.id !== id)) {
        alert("Já existe outra tarefa com esse título!");
        return;
    }

    const novaDescricao = prompt("Nova descrição:", tarefa.descricao);

    tarefa.titulo = novoTitulo.trim();
    tarefa.descricao = novaDescricao ? novaDescricao.trim() : "";

    atualizarLista();
}