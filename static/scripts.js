
function citySelect(sel) {

    var output = document.getElementById("cities").value = sel.options[sel.selectedIndex].text
    console.log(output)
    if (output != "Select city") {
        document.getElementById("inputDiv").hidden = false
        document.getElementById("autoCompleteCB").hidden = false
       //palautetaan output, että sitä voidaan käyttää jquery funktissa.
       
     

    }
    if (output === "Select city") {
        document.getElementById("inputDiv").hidden = true
        document.getElementById("autoCompleteCB").hidden = true

    }
}

var i = 0;
//funktiota kutstutaan setInterval metodin avulla 5 sekunnin välein index.html:ssä
//jokaisella kutsulla i:n arvo kasvaa yhdellä paitsi jos sen arvo on yhtä suuri
//kuin cities listan pituus, jolloin i arvo nollaantuu
function changeCityName() {
    var cities = ['Helsinki', 'Vaasa', 'Tampere', 'Oulu']
    document.getElementById("cityName").innerText = "Unique places in " + cities[i]
    i = i + 1;
    if (i === cities.length) {
        i = 0;
    }
}
//jos cb=true, eli checkboksi on klikattu kutsutaan clearInterval metodia, joka lopettaa
//5 sekunnin välein tapahtuvan funktiokutsun, jos cb=false jatketaan 5 sekunnin välein tapahtuvaa kutsua

function stopCityChange(cb) {
    console.log(cb.checked)
    if (cb.checked) {
        clearInterval(changeInterval)

    }
    if (cb.checked === false) {
        changeInterval = setInterval(changeCityName, 5000)

    }
}
var auto = false
function setAutoComplete(cb) {
}

$(document).ready(function () {

    $(function () {

        //jquery get hakee tiedoston sisällön
        jQuery.get('/static/hki_kadut.txt', function (data) {
            //autocompelete toimii siten että source on listamuodossa
            //streetlist jakaa rivinvaihdon kohdalta splitin avulla jokaisen kadun
            //omaksi listaelementiksi.
            var streetList = data.split("\n")
            $("#streetAddress").autocomplete({
                source: streetList
            });

        });

    });
    $(function () {
        
        //jquery get hakee tiedoston sisällön
        jQuery.get('/static/Helsinki.txt', function (data) {
            //autocompelete toimii siten että source on listamuodossa
            //streetlist jakaa rivinvaihdon kohdalta splitin avulla jokaisen kadun
            //omaksi listaelementiksi.
            var attractionList = data.split("\n")
            $("#destination").autocomplete({
                source: attractionList
            });

        });

    });
});

function createMap(lat,lon) {
var map = L.map('map').setView([lat,lon], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}


