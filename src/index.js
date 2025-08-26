// evento que aguarda o carregamento completo do DOM para executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Recupera a lista de itens do localStorage ou inicializa como um array vazio
  let itensLista = JSON.parse(localStorage.getItem("itensLista")) || [];

  // Seleciona os elementos do DOM onde os itens serão mostrados
  let itensListaTBody = document.getElementById("TBody");
  let itensListaCard = document.getElementById("cards");

  // Função para calcular a idade em meses a partir da data de plantio
  // foi adaptada do material do professor Rhavy
  let calcularIdadeEmMeses = (data) => {
    const dataPlantio = new Date(data); // Data de plantio
    const dataAtual = new Date(); // Data atual

    return (
      dataAtual.getMonth() -
      dataPlantio.getMonth() +
      12 * (dataAtual.getFullYear() - dataPlantio.getFullYear())
    );
  };

  // Itera sobre cada item da lista e cria os elementos HTML correspondentes
  for (let itemLista of itensLista) {
    // Se o elemento para a tabela existir, cria uma linha para o item
    if (itensListaTBody) {
      // Cria uma linha da tabela com as informações do item
      let itemlistaTr = `<tr>
        <th scope="row">${itemLista.id}</th>
        <td>${itemLista.nomePopular}</td>
        <td>${itemLista.nomeCientifico}</td>
        <td>${itemLista.producaoSafra}</td>
        <td>${itemLista.data}</td>
      </tr>`;
      // Adiciona a linha criada ao corpo da tabela
      itensListaTBody.insertAdjacentHTML("beforeend", itemlistaTr);
    }
    // Se o elemento para os cards existir, cria um card para o item
    if (itensListaCard) {
      // Calcula a idade em meses e adiciona ao objeto itemLista na propriedade idadeEmMeses
      itemLista.idadeEmMeses = calcularIdadeEmMeses(itemLista.data);
      // Cria o HTML do card com as informações do item
      let itemlistaCard = `<div class="col-md-4 mb-4">
    <div class="card h-100">
      <img src="${itemLista.urlImagem}" class="card-img-top cardImg" alt="Imagem de ${itemLista.nomePopular}">
      <div class="card-header">
      <div class="card-body d-flex flex-column">
        <div>
          <h5 class="card-title"><strong>Nome Popular:</strong> ${
            itemLista.nomePopular
          } </h5>
          <h6 class="card-subtitle mb-2 text-muted"><strong>Nome Científico:</strong> ${
            itemLista.nomeCientifico
          }</h6>
          <p class="card-text"><strong>ID:</strong> ${itemLista.id}</p>
          <p class="card-text"><strong>Produção média:</strong> ${
            itemLista.producaoSafra
          } kg/safra</p>
        </div>
        <div class="mt-auto">
          <p class="card-text text-success mb-0"><strong>Idade: ${
            itemLista.idadeEmMeses
          } meses</strong></p>
          <p class="card-text"><small class="text-muted">Plantio: ${new Date(
            itemLista.data
            // função que formata a data para o padrão brasileiro usando UTC para evitar problemas de fuso horário
          ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</small></p>
        </div>
      </div>
    </div>
  </div>`;
      // Adiciona o card criado na div pai dos cards que foi selecionada
      itensListaCard.insertAdjacentHTML("beforeend", itemlistaCard);
    }
  }
  // Seleciona o formulário de cadastro de itens e adiciona um listener para o evento submit
  let listaForm = document.getElementById("formCadastrarItem");
  // Se o formulário existir, continua o código
  if (listaForm) {
    // Adiciona um listener para o evento submit do formulário
    listaForm.addEventListener("submit", (event) => {
      // Previne o comportamento padrão do formulário (recarregar a página)
      event.preventDefault();
      // Cria um objeto FormData a partir do formulário para capturar os dados inseridos
      let listaFormData = new FormData(listaForm);
      // Atribui os dados do formulário a um objeto itemlista
      let itemlista = Object.fromEntries(listaFormData);
      // Gera um ID único para o item usando a data e hora atual
      itemlista.id = Date.now();
      // Adiciona o novo item ao array itensLista
      itensLista.push(itemlista);
      // Atualiza o localStorage com a nova lista de itens convertida para JSON
      localStorage.setItem("itensLista", JSON.stringify(itensLista));
      // Reseta o formulário para limpar os campos após o envio
      listaForm.reset();

      // Fechar modal
      $("#addModal").modal("toggle");
    });
  }
});
