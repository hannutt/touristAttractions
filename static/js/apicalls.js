function fetchApiData(cb) {
  var coordList=coordinates.split(",")
  console.log(coordinates)
  let options = {}
  if (cb) {
    options = {
      method: 'GET',
      headers: { 'X-Api-Key': '' }
    }
    //output on globaali muuttuja, joka on määritelty scripts.js:ssä
    let url = `https://api.api-ninjas.com/v1/weather?lat=${coordList[0]}&lon=${coordList[1]}`


    fetch(url, options)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`error ${err}`)
      });

  }

}