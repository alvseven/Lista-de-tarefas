let tarefas = []
let tarefasConcluidas = []

function criarCardTarefa (tipo, valor, id) {

    const container = document.querySelector(tipo) 

    const divPrincipal = document.createElement("div")
    const btnComplete  = document.createElement("button")
    const divParagraph = document.createElement("div")
    const divButton    = document.createElement("div")
    const p   = document.createElement("p")
    const button = document.createElement("button")

    divPrincipal.setAttribute("class", "lista-tarefas")
    divPrincipal.setAttribute("id", id)
    divParagraph.setAttribute("class", "paragraph")
    btnComplete.setAttribute("class", "btn-complete")
    btnComplete.setAttribute("id", id)
    button.setAttribute("class", "remover-tarefa")
    button.setAttribute("id", id)
    
    btnComplete.innerText = "✔️"
    p.innerText = `${valor}`
    button.innerText = '❌'

    divParagraph.append(btnComplete, p)
    divButton.append(button)
    divPrincipal.append(divParagraph, divButton)
    container.append(divPrincipal)

    button.addEventListener ("click", event => {

        const index = event.target.id

        let newArray = JSON.parse(localStorage.array)
        newArray.splice(index, 1)
        localStorage.array = JSON.stringify(newArray)
        
        document.querySelector("#listaTrabalho").innerHTML = ''
        document.querySelector("#listaEstudo").innerHTML = ''
        document.querySelector("#listaCasa").innerHTML = ''
        document.querySelector("#listaLazer").innerHTML = ''

        renderizarTarefa()

    })

    btnComplete.addEventListener ("click", event => {

        const index = event.target.id

        let newArray = JSON.parse(localStorage.array)
        const tarefaConcluida = newArray[index]
        newArray.splice(index, 1)
        localStorage.array = JSON.stringify(newArray)
        
        document.querySelector("#listaTrabalho").innerHTML = ''
        document.querySelector("#listaEstudo").innerHTML = ''
        document.querySelector("#listaCasa").innerHTML = ''
        document.querySelector("#listaLazer").innerHTML = ''

        renderizarTarefa()

        tarefaConcluida.dataConclusao = `${new Date().toLocaleDateString()} às ${new Date().toString().split(" ")[4]}`
    
        tarefasConcluidas.push(tarefaConcluida)
        createHist(tarefaConcluida)

    })    

}

function adicionarTarefa () {
    const btn = document.querySelector(".add")
    const input = document.querySelector(".digitar-tarefa")
    const select = document.querySelector(".selecionar-categoria")
    btn.addEventListener("click", event => {

        document.querySelector("#listaTrabalho").innerHTML = ''
        document.querySelector("#listaEstudo").innerHTML = ''
        document.querySelector("#listaCasa").innerHTML = ''
        document.querySelector("#listaLazer").innerHTML = ''

        if (localStorage.array) {
            tarefas = JSON.parse(localStorage.getItem('array'))
        }

        const tarefa = {
            nome: input.value,
            tipo: select.value,
            dia: new Date().toLocaleDateString(),
            horario: new Date().toString().split(" ")[4],
            dataConclusao: ''
        }

        tarefas.push(tarefa)
        localStorage.array = JSON.stringify(tarefas)
        renderizarTarefa ()
        input.value = ''
    })
}

function renderizarTarefa () {

    let array = JSON.parse(localStorage.getItem("array"))

    if (array) {
        
        for (let i = 0; i < array.length; i++) {

        if (array[i].tipo === 'Trabalho') {
        
        criarCardTarefa('#listaTrabalho', array[i].nome, i)
            }

        else if (array[i].tipo === 'Estudo') {
        
        criarCardTarefa('#listaEstudo', array[i].nome, i)
            }    
    
        else if (array[i].tipo === 'Casa') {
       
        criarCardTarefa('#listaCasa', array[i].nome, i)
            } 
       
        else if (array[i].tipo === 'Lazer') { 

        criarCardTarefa('#listaLazer', array[i].nome, i)      
            }
        }
    }
}

function createHist (tarefa) {

    const tabela = document.querySelector("table")
    const tr     = document.createElement("tr")

    const tdTarefa    = document.createElement("td")
    const tdAdicao    = document.createElement("td")
    const tdConclusao = document.createElement("td")
    const tdRemover   = document.createElement("td")
    const btn         = document.createElement("button") 

    tr.setAttribute("id", tarefasConcluidas.length)
    btn.setAttribute("id", tarefasConcluidas.length)
    btn.setAttribute("class", "remover-do-historico")

    tdTarefa.innerText = tarefa.nome
    tdAdicao.innerText = `${tarefa.dia} às ${tarefa.horario}`
    tdConclusao.innerText = tarefa.dataConclusao
    btn.innerText = 'Remover do histórico'

    tdRemover.append(btn)
    tr.append(tdTarefa, tdAdicao, tdConclusao, tdRemover)
    tabela.append(tr)

    btn.addEventListener("click", event => {
        const idBotao = event.target.id
        document.getElementById(idBotao).innerHTML = ''
    })

}



renderizarTarefa()
adicionarTarefa ()



