import {apiPath} from "./const.js"
import {
    updatePlayersOnMap,
    updateMeteoritesOnMap,
} from "./map.js"

// VARIABLES
let meteorite_index = 0;

// ===========================================
// ============== START THE GAME =============
// ===========================================

function startGame() {
    $.ajax({
        url: apiPath + "/admin/start",
        method: "POST",
        success: function(){
            console.log("Success");
        },
        error: function() {
            alert("error");
        }
    });
}

function stopGame() {
    $.ajax({
        url: apiPath + "/admin/stop",
        method: "POST",
        success: function(){
            console.log("Success");
            document.location.reload();
        },
        error: function() {
            alert("error");
        }
    });
}

// ===========================================
// ================= ZRR FORM ================
// ===========================================

function updateZrr() {
    let lattitude1 = $('#lat1').val();
    let longitude1 = $('#lon1').val();
    let lattitude2 = $('#lat2').val();
    let longitude2 = $('#lon2').val();

    $.ajax({
        contentType : 'application/json',
        url: apiPath + "/admin/zrr",
        method: "PUT",
        data: "{\"point_a\": ["+lattitude1+","+longitude1+"]," +
            "\"point_b\":["+lattitude2+","+longitude2+"]}",
        success: function(){
            console.log("Success");
        },
        error: function() {
            alert("Cannot update game's ZRR !");
        }
    });
}

// ===========================================
// =========== GAME PARAMETERS FORM ==========
// ===========================================

function updateTtl() {
    let ttl = $('#ttl').val();

    $.ajax({
        contentType : 'application/json',
        url: apiPath + "/admin/ttl",
        method: "PUT",
        data: "{\"initalTTL\":" + ttl +"}",
        success: function(){
            console.log("Success");
            displayDefaultTTL();
        },
        error: function() {
            alert("Cannot update initial game's TTL !");
        }
    });
}

function createMeteorite(lat, lng) {
    let type = $("#meteorType").val();
    let impact = "[" + lat + "," + lng + "]";
    let data =
        "{\"impact\":" + impact
        + ",\"type\":\"" + type
        + "\"}";

    $.ajax({
        contentType : 'application/json',
        url: apiPath + "/admin/meteorite",
        method: "POST",
        data: data,
        success: function(){
            console.log("Success");
            updateMeteoritesOnMap();
            startGame();
        },
        error: function() {
            alert("The meteorite isn't in ZRR");
        }
    });
}

// ===========================================
// ================ USERS FORM ===============
// ===========================================

function addPlayer() {
    let player = $('#usersList').val();

    $.ajax({
        url: apiPath + "/admin/player",
        method: "POST",
        contentType : 'application/json',
        data: "{\"id\":\"" + player + "\"}",
        success: function(){
            console.log("Success");
            displayPlayersList();
            updatePlayersOnMap();
        },
        error: function() {
            alert("Player already in game !");
        }
    });
}

// ===========================================
// =========== UPDATE INPUT FIELDS ===========
// ===========================================

function displayPlayersList() {
    $.ajax({
        url: apiPath + "/admin/players",
        method: "GET",
        // eslint-disable-next-line no-unused-vars
        success: function(data, textStatus, request){
            $("#playersList").empty();
            data.map((player) => {
                $("#playersList").append(
                    "<li id='" + player.id + "'>"
                        + "<a href=\"javascript:updateImage('Toto');\">"
                        + "<img src='https://upload.wikimedia.org"
                        + "/wikipedia/commons/thumb/3/32/"
                        + "Pediculus_humanus_var_capitis.jpg/"
                        + "800px-Pediculus_humanus_var_capitis.jpg?uselang=fr' "
                        + "alt='Pediculus humanus var capitis AKA head louse; "
                        + "public domain from http://phil.cdc.gov/' "
                        + "class='icon'>"
                        + "</a>&nbsp;&nbsp;-&nbsp;&nbsp;"
                        + "<a href=''> "
                            + player.id
                        + "</a>&nbsp;&nbsp;-&nbsp;&nbsp;"
                        + "<strong>TTL</strong> : "
                            + player.ttl + "s&nbsp;&nbsp;-&nbsp;&nbsp;"
                        + "<strong>Trophys</strong> : none"
                    + "</li>")
            })
        },
        error: function() {
            alert("Cannot display players in game !");
        }
    })
}

function displayDefaultTTL() {
    $.ajax({
        url: apiPath + "/admin/game",
        method: "GET",
        success: function(data){
            $("#ttl").val(data.initalTTL);
        },
        error: function() {
            alert("Cannot display initial TTL of the game !");
        }
    })
}

function displayZrrValues() {
    $.ajax({
        url: apiPath + "/admin/game",
        method: "GET",
        success: function(data){
            $("#lat1").val(data.zrr.point_a[0]);
            $("#lat2").val(data.zrr.point_b[0]);
            $("#lon1").val(data.zrr.point_a[1]);
            $("#lon2").val(data.zrr.point_b[1]);
        },
        error: function() {
            alert("Cannot display ZRR values !");
        }
    })
}

// ===========================================
// ================= EVENTS ==================
// ===========================================

$("#setTtl").submit((e) => {
    e.preventDefault();
    updateTtl();
});

$("#addUser").submit((e) => {
    e.preventDefault(); 
    addPlayer();
});

$("#stopGame").click((e) => {
    e.preventDefault();
    stopGame();
});

export {
    startGame,
    updateTtl,
    createMeteorite,
    addPlayer,
    displayPlayersList,
    displayDefaultTTL,
    displayZrrValues,
    updateZrr,
    meteorite_index
};