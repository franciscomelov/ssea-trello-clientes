"use strict";
//https://www.daniweb.com/programming/web-development/threads/348128/creating-an-html-page-automatically
//l#?options=
var url = "https://trello.com/b/LwJLRHFA.json";
function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
var json_obj = JSON.parse(Get(url));
//json_obj.cards[id].labels[0].color
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
        console.log(client);
        getClient(client);
        //http://127.0.0.1:5500/index.html#?options=1
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
    var output = "\n  <div class=\"card\" >\n    <span class=\"card--id\" >#" + client.id + " </span>\n    <h1 class=\"\"card--name>" + client.name + "</h1>\n    <span class=\"card--detail\">" + client.desc + "</span>\n\n  </div>\n  ";
    container.innerHTML += output;
};
fetchData();
