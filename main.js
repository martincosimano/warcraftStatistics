document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  let totalScore = 0
  const characterName = document.querySelector('#nameInput').value.toLowerCase()
  const realmName = document.querySelector('#realmInput').value.toLowerCase()
  let role = document.querySelector('#roleInput').value
  role = role.replace(/^./, role[0].toUpperCase())
  const raidSize = document.querySelector('#raidSizeInput').value
  let h2 = document.querySelector('h2')

  const url = ` https://classic.warcraftlogs.com:443/v1/rankings/character/${characterName}/${realmName}/us?api_key=94202797bf3c372e7d0f0dbc0b70996e`

  fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  for(let i = 0;i <= data.length - 1;i++){
    if(data[i].size === Number(raidSize) && data[i].spec === role.toString() && data[i].encounterName !=="Gothik the Harvester"){
      console.log(data[i].encounterName,Math.ceil(data[i].percentile))
      totalScore += (Math.ceil(data[i].percentile) / 16)
    }
  }
  if(totalScore !== 0){
    console.log(`${characterName.replace(/^./, characterName[0].toUpperCase())} score is ${Math.round(totalScore)}`)
    h2.innerText = `${characterName.replace(/^./, characterName[0].toUpperCase())} score is ${Math.round(totalScore)}`
    if(totalScore <= 20){
      document.querySelector('h2').style.color = "gray"
    }else if(totalScore <= 50){
      document.querySelector('h2').style.color = "green"
    }else if(totalScore <= 80){
      document.querySelector('h2').style.color = "#0070FF"
    }else if(totalScore <= 95){
      document.querySelector('h2').style.color = "#4B27EE"
    }else if(totalScore <= 100){
      document.querySelector('h2').style.color = "orange"
    }
  }else{
    console.log(`${characterName.replace(/^./, characterName[0].toUpperCase())} has no score`)
    h2.innerText = `${characterName.replace(/^./, characterName[0].toUpperCase())} has no score`
    document.querySelector('h2').style.color = "white"
  }
})
.catch(err => {
    console.log(`error ${err}`)
})
}