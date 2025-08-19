document.addEventListener("DOMContentLoaded", () => {
  let itensLista = JSON.parse(localStorage.getItem("itensLista")) || [];

  let itensListaTBody = document.getElementById("TBody");
  let itensListaCard = document.getElementById("cards");

  let calcularIdadeEmMeses = (data) => {
    const dataPlantio = new Date(data);
    const dataAtual = new Date();

    return (
      dataAtual.getMonth() -
      dataPlantio.getMonth() +
      12 * (dataAtual.getFullYear() - dataPlantio.getFullYear())
    );
  };

  for (let itemLista of itensLista) {
    if (itensListaTBody) {
      let itemlistaTr = `<tr>
        <th scope="row">${itemLista.id}</th>
        <td>${itemLista.nomePopular}</td>
        <td>${itemLista.nomeCientifico}</td>
        <td>${itemLista.producaoSafra}</td>
        <td>${itemLista.data}</td>
      </tr>`;
      itensListaTBody.insertAdjacentHTML("beforeend", itemlistaTr);
    }

    if (itensListaCard) {
      itemLista.idadeEmMeses = calcularIdadeEmMeses(itemLista.data);

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
          ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</small></p>
        </div>
      </div>
    </div>
  </div>`;
      itensListaCard.insertAdjacentHTML("beforeend", itemlistaCard);
    }
  }

  let listaForm = document.getElementById("formCadastrarItem");
  if (listaForm) {
    listaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let listaFormData = new FormData(listaForm);
      let itemlista = Object.fromEntries(listaFormData);

      itemlista.id = Date.now();

      itensLista.push(itemlista);
      localStorage.setItem("itensLista", JSON.stringify(itensLista));

      listaForm.reset();

      // Fechar modal
      $("#addModal").modal("toggle");
    });
  }
});
