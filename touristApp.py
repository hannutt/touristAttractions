from flask import Flask, redirect, render_template, request
import urllib
app = Flask(__name__)
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from geopy.geocoders import Nominatim
from haversine import haversine, Unit

def connectDB():
    dbPsw=os.getenv('dbPsw')
    dbUser=os.getenv("dbUser")
    username = urllib.parse.quote(str(dbUser))
    password = urllib.parse.quote(str(dbPsw))
    uri = "mongodb+srv://{}:{}@cluster0.gfnzlpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0".format(username, password)
    client = MongoClient(uri, server_api=ServerApi('1'))
    return client


@app.route('/')
def start():
     cities=['Helsinki','Tampere','Vaasa','Oulu']
     return render_template('index.html',cities=cities)

@app.route("/showAttractions", methods=['POST','GET'])
def showAttractions():
    #haetaan currentLoc nimisen checkboxin:n value attribuuttu
    currentcb=request.form.get('currentLoc')
    print("currrent",currentcb)
    #käyttäjän valitsema kaupunki
    city=request.form['cities']
    city=city.lower()
   
    destination=request.form['destination']
  
  
    #käyttäjän syöte
    street=request.form['streetAddress']
    currentCoordinates=street.split(",")
    fullAddress=city+","+street
    mClient=connectDB()
    dataBaseName=mClient['touristDB']
    collection=dataBaseName[city]
    #disticnt metodilla haetaan vain kentän nimen jälkeinen arvo, jossa attract name on mannerheim statue
    #vrt sql where
  
    destinationLatitude=collection.distinct('attractLat',{"attractName":destination})
    destinationLongitude=collection.distinct('attractLon',{"attractName":destination})
    attractionImageUrl=collection.distinct('attractImage',{'attractName':destination})
    attractionName=collection.distinct('attractName',{"attractName":destination})
    geolocator = Nominatim(user_agent="GetLoc")
    #jos User current position checkboxia on klikattu
    if currentcb=="currentLocation":
        geoLoc = Nominatim(user_agent="GetLoc")
        #reverse, eli sijainti annetaan osoitteen sijaan lat/lon koordinaatteina
        locname = geoLoc.reverse(currentCoordinates)
        location=geolocator.geocode(locname)
    else:
        #sijainti annetaan kaupunki+katunimi muodossa
        location = geolocator.geocode(fullAddress)
    myLat=location.latitude
    myLong=location.longitude
    myLocation=(myLat,myLong)
    latFloat=float(destinationLatitude[0])
    longFloat=float(destinationLongitude[0])
    imgUrl=attractionImageUrl[0]
   
    attractionLocation=(latFloat,longFloat)
    #lasketaan etäisyys käyttäjän antaman kaupungin ja kadun + nähtävyyden välillä
    distance=haversine(myLocation,attractionLocation)
    distance=round(distance,2)
    #aika-arvio kävellen
   
    walktime=distance/5
    biketime=distance/15
    
#muunnetaan distance/5 tulos tunneiksi,minuuteiksi ja sekunneiksi
    hours = int(walktime)
    minutes = (walktime*60) % 60
    seconds = (walktime*3600) % 60
    estTravelTimeWalk="%d:%02d.%02d" % (hours, minutes, seconds)
    hours = int(biketime)
    minutes = (biketime*60) % 60
    seconds = (biketime*3600) % 60
    estTravelTimeBike="%d:%02d.%02d" % (hours, minutes, seconds)
    
    return render_template('index.html',distance=distance,street=street,estTravelTimeWalk=estTravelTimeWalk,estTravelTimeBike=estTravelTimeBike,latFloat=latFloat,longFloat=longFloat,imgUrl=imgUrl,attractionName=attractionName,
                           myLat=myLat,myLong=myLong)





if __name__ == '__main__':
    app.run(debug=True)