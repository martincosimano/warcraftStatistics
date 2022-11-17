document.querySelector('button').addEventListener('click', getFetch)
let totalScore = 0

function getFetch(){
  const characterName = document.querySelector('input').value.toLowerCase()
  console.log(characterName)
  const url = ` https://classic.warcraftlogs.com:443/v1/rankings/character/${characterName}/benediction/us?api_key=94202797bf3c372e7d0f0dbc0b70996e`

  fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  for(let i = 0;i < data.length - 1;i++){
    console.log(data[i].encounterName,data[i].percentile)
    totalScore += Number(data[i].percentile) / (data.length -1)
  }
})
.catch(err => {
    console.log(`error ${err}`)
})
}