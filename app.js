// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getDatabase,
    ref,
    orderByChild,
    limitToLast,
    onValue,
    query,
    orderByKey,
    push,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAfUkfU9QjR7cHsFU4Dt-TS4fTe_OP6_jU",
    authDomain: "child-find-5b9f5.firebaseapp.com",
    databaseURL: "https://child-find-5b9f5-default-rtdb.firebaseio.com",
    projectId: "child-find-5b9f5",
    storageBucket: "child-find-5b9f5.appspot.com",
    messagingSenderId: "209461473002",
    appId: "1:209461473002:web:3e24e7027e83307141b193",
    measurementId: "G-L3LMFB855V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

let GPS = ref(database, "Child");



// })
let gpslat = 0;
let gpslon = 0;

function handleNewData(snapshot) {
    if (snapshot.exists()) {
        let dataArray = Object.values(snapshot.val());
        console.log(dataArray[1]);
        console.log(dataArray[2]);
        console.log(dataArray[4]);
        gpslat = dataArray[1];
        gpslon = dataArray[2];
        document.getElementById('GPSlatitude').innerHTML = dataArray[1];
        document.getElementById('GPSlongitude').innerHTML = dataArray[2];
        document.getElementById('state').innerHTML = dataArray[4];
    }
    // Update your UI or do something with the received data
}
onValue(GPS, handleNewData);


// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
let map;
let marker;
let mapOptions;
function initMap() {
   mapOptions = {
    zoom: 18,
    center: { lat: gpslat, lng: gpslon },
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: { lat: gpslat, lng: gpslon },
    map: map,
  });
  // You can use a LatLng literal in place of a google.maps.LatLng object when
  // creating the Marker object. Once the Marker object is instantiated, its
  // position will be available as a google.maps.LatLng object. In this case,
  // we retrieve the marker's position using the
  // google.maps.LatLng.getPosition() method.
  const infowindow = new google.maps.InfoWindow({
    content: "<p>Marker Location:" + marker.getPosition() + "</p>",
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
}

window.initMap = initMap;

function print(){
    updateMarkerAndMap();
    }
    setInterval(print,2000);

    function updateMarkerAndMap() {
        // Replace these with your dynamic GPS coordinates
        var latlng = new google.maps.LatLng(gpslat, gpslon);

        // Update marker position
        marker.setPosition(latlng);

        // Update map center
        map.setCenter(latlng);

        // Update infowindow content
        const infowindowContent = "<p>Marker Location:" + marker.getPosition() + "</p>";
        const infowindow = new google.maps.InfoWindow({
          content: infowindowContent,
        });

        google.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      }