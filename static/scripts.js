
function citySelect(sel) {
    // output on globaali muuttuja, koska siitä puuttuu var
    output = document.getElementById("cities").value = sel.options[sel.selectedIndex].text
    if (output != "Select city") {
        document.getElementById("inputDiv").hidden = false
        document.getElementById("autoCompleteCB").hidden = false




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

function setAutoComplete(cb) {

    if (cb.checked) {
        document.getElementById("jqueryAC").innerText = "Stop Autocomplete"
        useAutoComplete(cb.checked)
    }
    if (cb.checked === false) {
        document.getElementById("jqueryAC").innerText = "Use Autocomplete"
        useAutoComplete(cb.checked)

    }
}


function useAutoComplete(cbval) {

    //poistaa autocompleten käytöstä.
    if (cbval === false) {
        $("#streetAddress").autocomplete({
            disabled: true
        });

    }

    if (cbval) {

        $(document).ready(function () {

            $(function () {

                //jquery get hakee tiedoston sisällön
                jQuery.get('/static/streets/' + output + "Kadut.txt", function (data) {
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
                jQuery.get('/static/streets/' + output + 'Paikat.txt', function (data) {
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

    }

}



function createMap(lat, lon) {

    var map = L.map('map').setView([lat, lon], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

//puheentunnistus, puhe muutetaan tekstiksi ja teksti sijoitetaan streetAddress input kenttään.
function runSpeechRecog() {
    var fromStreet = document.getElementById("streetAddress")
    let recognization = new webkitSpeechRecognition();
    recognization.onstart = () => {

    }
    recognization.onresult = (e) => {
        var transcript = e.results[0][0].transcript;
        fromStreet.value = transcript;
    }
    recognization.start();
}



