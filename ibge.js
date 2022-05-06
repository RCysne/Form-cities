const SELECT_REGIAO = document.getElementById('regiao')
const SELECT_ESTADO = document.getElementById('estado')
const SELECT_CIDADE = document.getElementById('cidade')

const URL_REGIOES =
  'https://servicodados.ibge.gov.br/api/v1/localidades/regioes'

const URL_ESTADOS = id =>
  `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${id}/estados`

const URL_CIDADES = id =>
  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`

fetch(URL_REGIOES)
  .then(res => res.json())
  .then(regioes => {
    regioes.map(cadaRegiao => {
      SELECT_REGIAO.innerHTML += `
      <option value="${cadaRegiao.id}">${cadaRegiao.nome}</option>`
    })
  })

SELECT_REGIAO.addEventListener('change', () => {
  let regiaoId = SELECT_REGIAO.value // O value se sobrepoe
  //alert(regiaoId)

  SELECT_ESTADO.innerHTML = `<option> -- Selecione --</option>`

  fetch(URL_ESTADOS(regiaoId))
    .then(res => res.json())
    .then(estados => {
      estados.map(cadaEstado => {
        SELECT_ESTADO.innerHTML += `
        <option value="${cadaEstado.id}">${cadaEstado.nome}</option>`
      })
    })
})

SELECT_ESTADO.addEventListener('change', () => {
  let estadoId = SELECT_ESTADO.value

  SELECT_CIDADE.innerHTML = `<option> -- Selecione -- </option>`

  fetch(URL_CIDADES(estadoId))
    .then(res => res.json())
    .then(cidades => {
      cidades.map(cadaCidade => {
        SELECT_CIDADE.innerHTML += `
        <option value="${cadaCidade.id}">${cadaCidade.nome}</option>`
      })
    })
})
