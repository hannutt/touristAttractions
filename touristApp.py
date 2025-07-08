from flask import Flask, redirect, render_template, request
import urllib
app = Flask(__name__)
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

def connectDB():
    dbPsw=os.getenv('dbPsw')
    dbUser=os.getenv("dbUser")
    username = urllib.parse.quote(str(dbUser))
    password = urllib.parse.quote(str(dbPsw))
    uri = "mongodb+srv://{}:{}@cluster0.gfnzlpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0".format(username, password)
   
    client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection    
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)



@app.route('/')
def start():
     cities=['Helsinki','Tampere','Seinäjoki','Oulu']
     return render_template('index.html',cities=cities)

@app.route("/showAttractions", methods=['POST','GET'])
def showAttractions():
    city=request.form['cities']
    print("selected city ",city)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)