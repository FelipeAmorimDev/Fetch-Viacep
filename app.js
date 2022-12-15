// Utilizando a API https://viacep.com.br/ws/${CEP}/json/
// crie um formulário onde o usuário pode digitar o cep
// e o endereço completo é retornado ao clicar em buscar

// Utilizando a API https://blockchain.info/ticker
// retorne no DOM o valor de compra da bitcoin and reais.
// atualize este valor a cada 30s

// Utilizando a API https://api.chucknorris.io/jokes/random
// retorne uma piada randomica do chucknorris, toda vez que
// clicar em próxima
const form = document.querySelector(".buscarcep-container__form");
const resultCard = document.querySelector(".result-description")
const pError = document.createElement('p')

function getCepData(cep) {
  
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => {
    return response.json()
  }).then(jsonData => {
    
    if(jsonData.erro){
     
      pError.textContent = 'CEP não encontrado!'
      pError.classList.add('errorFetch')
  
      form.submitBtn.insertAdjacentElement('afterend',pError)

      if(resultCard.style.visibility === 'visible'){
        resultCard.style.visibility = 'hidden'
        resultCard.style.opacity = '0'
      }
      return
    }

    const cepValue = resultCard.querySelector('h3:nth-child(2) > span');
    const logadradouroValue = resultCard.querySelector('h3:nth-child(3) > span');
    const bairroValue = resultCard.querySelector('h3:nth-child(4) > span');
    const cidadeValue = resultCard.querySelector('h3:nth-child(5) > span');
    const estadoValue = resultCard.querySelector('h3:nth-child(6) > span');
    
    cepValue.textContent = jsonData.cep
    logadradouroValue.textContent = jsonData.logradouro
    bairroValue.textContent = jsonData.bairro
    cidadeValue.textContent = jsonData.localidade
    estadoValue.textContent = jsonData.uf
    resultCard.style.visibility = 'visible'
    resultCard.style.opacity = '1'
    
  }).catch(er => {
    Error('Nao foi possivel carregar os dados ',er)
  })

}

form.addEventListener('click', event => {

  

  event.preventDefault();
  
  if (event.target.matches('[type="submit"')) {
    resultCard.style.visibility = 'hidden'
    resultCard.style.opacity = '0'
    pError.remove();

    const cepValue = form.cep.value;
    const cepPattern = /^[0-9]{5}[-][0-9]{3}$/
    const isAValidCep = cepPattern.test(cepValue)

    
    if (isAValidCep) {
      const cepFormated = cepValue.replace("-","")
      getCepData(cepFormated)
    }else{
      pError.textContent = 'Por favor digite um CEP valido! (00000-000)'
      pError.classList.add('errorFetch')
  
      form.submitBtn.insertAdjacentElement('afterend',pError)
    }
  }

})

