function citySelect(sel) {

    var output = document.getElementById("cities").value = sel.options[sel.selectedIndex].text
    console.log(output)
    if (output != "Select city") {
        document.getElementById("streetAddress").hidden = false
        document.getElementById("autoCompleteCB").hidden=false
    }
    if (output === "Select city") {
        document.getElementById("streetAddress").hidden = true
        document.getElementById("autoCompleteCB").hidden=true

    }
}

var i = 0;
//funktiota kutstutaan setInterval metodin avulla 5 sekunnin välein index.html:ssä
//jokaisella kutsulla i:n arvo kasvaa yhdellä paitsi jos sen arvo on yhtä suuri
//kuin cities listan pituus, jolloin i arvo nollaantuu
function changeCityName() {
    var cities = ['Helsinki', 'Seinäjoki', 'Tampere', 'Oulu']
    document.getElementById("cityName").innerText = "Unique places in "+cities[i]
    i=i+1;
    if (i===cities.length)
    {
        i=0;
    }
}
//jos cb=true, eli checkboksi on klikattu kutsutaan clearInterval metodia, joka lopettaa
//5 sekunnin välein tapahtuvan funktiokutsun, jos cb=false jatketaan 5 sekunnin välein tapahtuvaa kutsua

function stopCityChange(cb) {
    console.log(cb.checked)
    if (cb.checked)
    {
        clearInterval(changeInterval)

    }
    if (cb.checked===false)
    {
        changeInterval=setInterval(changeCityName, 5000)

    }
}
 var auto = false
function setAutoComplete(cb) {
}



