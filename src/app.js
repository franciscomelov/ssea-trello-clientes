"use strict";
//#?options=
var url = "https://trello.com/b/LwJLRHFA.json";
function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
var json_obj = JSON.parse(Get(url));
var container = document.getElementById("app");
var fetchData = function () {
    var url = window.location.href;
    var match = url.match('[=]');
    if (match == null) {
        var numeroCartas = json_obj.cards.length;
        for (var i = 0; i < numeroCartas; i++) {
            getClient(i);
        }
    }
    else {
        var client = parseInt(url.slice(match.index + 1, url.length));
        getClient(client);
    }
};
var getClient = function (id) {
    var transformedClient = {
        id: id,
        name: json_obj.cards[id].name,
        desc: json_obj.cards[id].desc
    };
    ShowCLient(transformedClient);
};
var ShowCLient = function (client) {
    var output = "\n  <div class=\"card\" >\n    <span class=\"card--id\" >" + client.id + " </span>\n    <h1 class=\"\"card--name>" + client.name + "</h1>\n    <span class=\"card--detail\">" + client.desc + "</span>\n  </div>\n  ";
    container.innerHTML += output;
};
fetchData();
// Show relative url based on card
var e = document.getElementsByClassName('card');
console.log(e);
var _loop_1 = function (i) {
    e[i].addEventListener("click", function () {
        //do something here
        var newUrl = "http://127.0.0.1:5500/index.html#?options=" + e[i].innerText[0];
        console.log(newUrl);
        //or call a function
    });
};
for (var i in e) {
    _loop_1(i);
}
