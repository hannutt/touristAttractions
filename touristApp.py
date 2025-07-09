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
    data=[]
    #käyttäjän valitsema kaupunki
    city=request.form['cities']
    city=city.lower()
    #käyttäjän syöte
    street=request.form['streetAddress']
    fullAddress=city+","+street
    mClient=connectDB()
    dataBaseName=mClient['touristDB']
    collection=dataBaseName[city]
    #disticnt metodilla haetaan vain kentän nimen jälkeinen arvo, jossa attract name on mannerheim statue
    #vrt sql where
  
    latitude=collection.distinct('attractLat',{"attractName":"Mannerheim Statue"})
    longitude=collection.distinct('attractLon',{"attractName":"Mannerheim Statue"})
    geolocator = Nominatim(user_agent="GetLoc")
    #paikannetaan käyttäjä, fullAdress on kaupunki + syötetty osoite
    location = geolocator.geocode(fullAddress)
    myLat=location.latitude
    myLong=location.longitude
    myLocation=(myLat,myLong)
    latFloat=float(latitude[0])
    longFloat=float(longitude[0])
   
    attractionLocation=(latFloat,longFloat)
    distance=haversine(myLocation,attractionLocation)
    distance=round(distance,2)
    result=collection.find()
    for r in result:
        data.append(r)
    return render_template('index.html',data=data,distance=distance,street=street)


if __name__ == '__main__':
    app.run(debug=True)