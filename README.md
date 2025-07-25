Project keywords: Python Flask, JavaScript, LeatfletJS, Bootstrap 5, Geocoding


ABOUT THE APPLICATION

The backend is made with the Python Flask framework and the cloud-based MongoBD NoSQL database. The frontend is made with HTML, Bootstrap 5, Vanilla JavaScript, and jQuery.

The main idea of the application is to provide information about tourist destinations in different cities in Finland. The coordinates and names of the travel destinations are stored in a NoSQL database, and when the data is retrieved, the application calculates the distance between the user's location and the destination and displays the result in kilometers. The calculation is done using Python's Geopy.geocoders, Nominatim and Haversine libraries.

ENTERING THE USER'S LOCATION

There are two ways a user can provide their location. In both cases, the first step is to select a city from the HTML selector. The user can then type a street address into the HTML input field or click the "User's current location" checkbox. Using the current location calls a JavaScript function that executes the HTML Geolocation API to determine the current latitude and longitude coordinates of the user's device.

Finally, the user's location information is sent as parameters to the Geolocator Geocode method, which calculates the distance information.

AUTOCOMPLETE TEXT

The application uses external text files that contain all the street names of the cities of Helsinki and Vaasa, as well as the street addresses of attractions in these cities. The user can use jQuery autocomplete when typing their own street address and the street address of the attraction. The application selects the correct text file based on the user's input and reads its contents using the jQuery Get method.

Autocomplete is activated by clicking the "use jQuery autocomplete" checkbox. After clicking, the contents of the file are retrieved using the jQuery Get method, after which the contents are stored in a JavaScript array and the array is passed as a parameter to the jQuery autocomplete source property.

USING SPEECH RECOGNITION

You can also enter a street address using your device's microphone. By clicking the microphone icon, the app executes a JavaScript function that uses the SpeechRecognition web interface to convert the user's speech to text and finally insert it into the HTML input field.

SHOWING DESTINATION ON MAP

The user can display the destination on a map if they wish. The map image display is implemented using OpenStreetMap and JavaScript Leaflet JS libraries.