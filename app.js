// Utilizando a API https://viacep.com.br/ws/${CEP}/json/
// crie um formulário onde o usuário pode digitar o cep
// e o endereço completo é retornado ao clicar em buscar

const form = document.querySelector(".buscarcep-container__form");
const resultCard = document.querySelector(".result-description")
const pError = document.createElement('p')

const isPossibleRemoveVisibility = () => {
  const isVisible = resultCard.style.visibility === 'visible';
  if (isVisible) {
    resultCard.style.visibility = 'hidden'
    resultCard.style.opacity = '0'
  }
}

const regexCep = (cepValue) => {

  const isAValidCep = /^[0-9]{5}[-][0-9]{3}$/.test(cepValue)

  return isAValidCep
}

const addErroMsg = (msg) => {
  pError.textContent = msg
  pError.classList.add('errorFetch')
  form.submitBtn.insertAdjacentElement('afterend', pError)
}

const isPossibleGetCepData = () => {
  const cepValue = form.cep.value
  const isAValidCep = regexCep(cepValue)

  if (isAValidCep) {
    const cepFormated = cepValue.replace("-", "")
    getCepData(cepFormated)
  } else {
    addErroMsg('Por favor digite um CEP valido! (00000-000)')
  }
}

const isASubmitEvent = (target) => {
  if (target.matches('[type="submit"')) {
    isPossibleRemoveVisibility()
    pError.remove();
    isPossibleGetCepData()
  }
}

const showResultCard = () => {
  resultCard.style.visibility = 'visible'
  resultCard.style.opacity = '1'
}

const putResultIntoDOM = data => {
  const cepData = [];
  const jsonKeys = [data.cep,
  data.logradouro,
  data.bairro,
  data.localidade,
  data.uf]

  jsonKeys.forEach((_, index) => {
    const cepDataElement = resultCard.querySelector(`h3:nth-child(${index + 2}) > span`);
    cepData.push(cepDataElement)
  })
  cepData.forEach((cepData, index) => {
    cepData['textContent'] = jsonKeys[index]
  })
}

function getCepData(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      return response.json()
    })
    .then(jsonData => {
      if (jsonData.erro) {
        addErroMsg('CEP não encontrado!')
        isPossibleRemoveVisibility()
        return
      }

      putResultIntoDOM(jsonData)
      showResultCard()
    })
}


form.addEventListener('click', event => {
  const targetEvent = event.target

  event.preventDefault();
  isASubmitEvent(targetEvent)
})

