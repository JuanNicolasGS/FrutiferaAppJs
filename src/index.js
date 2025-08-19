let itensLista = JSON.parse(localStorage.getItem('itensLista')) || [];
let cont = 0;
for (let itemLista of itensLista) {
  let itensListaTBody = document.getElementById('TBody');

  cont = Date.now();

  let itemlistaTr = `<tr>
    <th scope="row">${cont}</th>
    <td>${itemLista.nomePopular}</td>
    <td>${itemLista.nomeCientifico}</td>
    <td>${itemLista.producaoSafra}</td>
    <td>${itemLista.data}</td>
  </tr>`;

  itensListaTBody.insertAdjacentHTML('beforeend', itemlistaTr);
  console.log(itemlistaTr);
}

let listaForm = document.getElementById('formCadastrarItem');
const handleSubmit = (event) => {
  event.preventDefault();

  let listaFormData = new FormData(listaForm);
  let itemlista = Object.fromEntries(listaFormData);

  // Adicionam o valor no localstorage.
  itensLista.push(itemlista);
  localStorage.setItem('itensLista', JSON.stringify(itensLista));

  // Fechar o modal.
  $('#addModal').modal('toggle');


  // Limpar o formulário.
  listaForm.reset();
};


listaForm.addEventListener('submit', handleSubmit);
