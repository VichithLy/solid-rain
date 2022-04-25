import {apiPath, springURL} from "./const.js"
import {
    createMeteorite,
    displayPlayersList,
    displayDefaultTTL,
    displayZrrValues
} from "./script.js"
import PlayerIcon from '../img/player.png'
import MeteoriteIcon from '../img/meteorite_icon.png'

// Solve Leaflet icons issue
L.Icon.Default.imagePath = '.';
// OR
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Variables
let lat = 45.782, lng = 4.8656, zoom = 19;
let rectangle = L.rectangle([[0,0],[0,0]]);
let isSendMeteorite = false;
let isSetPointA = false;
let isSetPointB = false;
let mymap = L.map('map', {
    center: [lat, lng],
    zoom: zoom
});

// ===========================================
// ================ MAP INIT =================
// ===========================================

// WHEN DOCUMENT IS LOADED
$(document).ready(function() {
    // INIT LIST OF ALL EXISTING USERS
    $.ajax({
        url: springURL + "/users",
        method: "GET",
        dataType: 'json',
        success: function(data){
            data.map((user) => {
                $("#usersList")
                    .append("<option value='"+user+"'>"+user+"</option>");
            })
        },
        error: function() {
            alert("Cannot get all available users !");
        }
    })

    initMap(mymap);
    mymap.on('click', onMapClick);
});

function initMap(mymap) {
    // Création d'un "tile layer" (permet l'affichage sur la carte)
    L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/' +
        '{z}/{x}/{y}@2x.jpg90?access_token=' +
        'pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx' +
        '4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
        maxZoom: 22,
        minZoom: 1,
        attribution: 'Map data &copy; ' +
            '<a href="https://www.openstreetmap.org/">' +
            'OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">' +
            'CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx' +
            '4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA'
    }).addTo(mymap);

    // Ajout d'un marker
    L.marker([45.78207, 4.86559])
        .addTo(mymap)
        .bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.')
        .openPopup();

    // INIT LIST OF ALL PLAYERS
    displayPlayersList();
    // INIT DEFAULT TTL FORM
    displayDefaultTTL();
    // INIT ZRR FORM
    displayZrrValues();
    // INIT ZRR RECTANGLE ON MAP
    updateZrrOnMap();
    // INIT METEORITES ON MAP
    updateMeteoritesOnMap();
    // INIT PLAYERS ON MAP
    updatePlayersOnMap();
}

// ===========================================
// ================ UPDATE MAP ===============
// ===========================================

function updatePlayersOnMap() {
    // Player icon
    let playerIcon = L.icon({
        iconUrl: PlayerIcon,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -15],
    });

    $.ajax({
        url: apiPath + "/admin/players",
        method: "GET",
        success: function(data){
            data.map((player) => {
                L.marker([player.position[0], player.position[1]], 
                    {icon: playerIcon}).addTo(mymap)
                    .bindPopup("Player " + player.id);
            })
        },
        error: function() {
            alert("Cannot display players on map !");
        }
    })
}

function updateMeteoritesOnMap() {
    // Meteorite icon
    let meteoriteIcon = L.icon({
        iconUrl: MeteoriteIcon,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -15],
    });

    $.ajax({
        url: apiPath + "/api/meteorites",
        method: "GET",
        success: function(data){
            data.map((meteorite) => {
                L.marker([meteorite.impact[0], meteorite.impact[1]], 
                    {icon: meteoriteIcon})
                    .addTo(mymap).bindPopup("Météorite "
                    + meteorite.id + " " + meteorite.type);
            })
        },
        error: function() {
            alert("Cannot display meteorites on map !");
        }
    })
}

function updateZrrOnMap() {
    mymap.removeLayer(rectangle);
    $.ajax({
        url: apiPath + "/admin/game",
        method: "GET",
        success: function(data){
            rectangle =  new L.rectangle([
                [data.zrr.point_a[0], data.zrr.point_a[1]],
                [data.zrr.point_b[0], data.zrr.point_b[1]]
            ]);
            mymap.addLayer(rectangle);
        },
        error: function() {
            alert("Cannot display ZRR on map !");
        }
    })
}

// ===========================================
// ============= SEND METEORITE ==============
// ===========================================

function sendMeteorite() {
    isSendMeteorite = true;
    scrollToAnchor("mapScroll");
    $("#msgSet").html("Cliquer sur la carte " +
        "pour déclencher un impact de météorite.");
}

// ===========================================
// ================= SET ZRR =================
// ===========================================

function setPoint_a() {
    isSetPointA = true;
    scrollToAnchor("mapScroll");
    $("#msgSet").html("Cliquer sur la carte " +
        "pour définir le premier coin de la ZRR.");
}

function setPoint_b() {
    isSetPointB = true;
    scrollToAnchor("mapScroll");
    $("#msgSet").html("Cliquer sur la carte " +
        "pour définir le deuxième coin de la ZRR.");
}

function createZrr() {
    mymap.removeLayer(rectangle);

    let lat1 = $('#lat1').val();
    let lat2 = $('#lat2').val();
    let lon1 = $('#lon1').val();
    let lon2 = $('#lon2').val();

    $.ajax({
        contentType : 'application/json',
        url: apiPath + "/admin/zrr",
        method: "PUT",
        data: "{\"point_a\": ["+lat1+","+lon1+"]," +
            "\"point_b\":["+lat2+","+lon2+"]}",
        success: function(){
            console.log("Success");
            updateZrrOnMap();
            displayZrrValues();
        },
        error: function() {
            alert("error");
        }
    });
}

// ===========================================
// ============== ON MAP CLICK ===============
// ===========================================

function onMapClick(e) {
    var popup = L.popup();
    $("#msgSet").html("");

    lat = e.latlng.lat;
    lng = e.latlng.lng;

    if (isSetPointA == true) {
        $('#lat1').val(lat);
        $('#lon1').val(lng);

        popup
            .setLatLng(e.latlng)
            .setContent("Point a at (" + e.latlng.lat.toString()
                + ", " + e.latlng.lng.toString() + ")")
            .openOn(mymap)

        isSetPointA = false;
        $("#msgSetZrr").html("");

    } else if (isSetPointB == true) {
        $('#lat2').val(lat);
        $('#lon2').val(lng);

        popup
            .setLatLng(e.latlng)
            .setContent("Point b at (" + e.latlng.lat.toString()
                + ", " + e.latlng.lng.toString() + ")")
            .openOn(mymap)

        isSetPointB = false;
        $("#msgSetZrr").html("");

    } else if (isSendMeteorite == true) {
        createMeteorite(lat, lng)
    }
}

// ===========================================
// ================= EVENTS ==================
// ===========================================

$("#setCorner1").submit((e) => {
    e.preventDefault();
    setPoint_a();
});

$("#setCorner2").submit((e) => {
    e.preventDefault();
    setPoint_b();
});

$("#sendZrr").submit((e) => {
    e.preventDefault();
    createZrr();
});

$("#setMeteorType").submit((e) => {
    e.preventDefault(); 
    sendMeteorite();
});


// ===========================================
// ================== UTILS ==================
// ===========================================

// Scrolling
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

export {
    initMap,
    updatePlayersOnMap,
    updateMeteoritesOnMap,
    updateZrrOnMap,
    onMapClick,
    scrollToAnchor,
    setPoint_a,
    setPoint_b,
    createZrr,
    sendMeteorite,
    isSendMeteorite,
    isSetPointA,
    isSetPointB,
};