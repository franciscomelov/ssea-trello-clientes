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
var clients = [];
var fetchData = function () {
    var numeroCartas = json_obj.cards.length;
    for (var i = 0; i < numeroCartas; i++) {
        getClient(i);
    }
};
var getClient = function (id_num) {
    var current_url = window.location.href;
    var match = current_url.match('[=]');
    var transformedClient = {
        id: json_obj.cards[id_num].id,
        name: json_obj.cards[id_num].name,
        desc: json_obj.cards[id_num].desc
    };
    clients.push(transformedClient);
    if (match == null) {
        ShowCLient(transformedClient);
    }
    else {
        var id = json_obj.cards[id_num].id;
        var client = current_url.slice(match.index + 1, current_url.length);
        if (id == client) {
            var transformedClient_1 = {
                id: json_obj.cards[id_num].id,
                name: json_obj.cards[id_num].name,
                desc: json_obj.cards[id_num].desc
            };
            ShowCLient(transformedClient_1);
        }
    }
};
var ShowCLient = function (client) {
    var output = "\n  <div class=\"card\" >\n    <span class=\"card--id\" >" + client.id + " </span>\n    <h1 class=\"\"card--name>" + client.name + "</h1>\n    <span class=\"card--detail\">" + client.desc + "</span>\n  </div>\n  ";
    container.innerHTML += output;
};
fetchData();
//Show relative url based on card
var e = document.getElementsByClassName('card');
var _loop_1 = function (i) {
    e[i].addEventListener("click", function () {
        //do something here
        var sub_id = e[i].innerText;
        var result = sub_id.search(/\n/);
        var id = sub_id.substring(0, result);
        var newUrl = window.location.href + "#?options=" + id;
        console.log(newUrl);
        navigator.clipboard.writeText(newUrl);
        alert("Copiado");
        //or call a function
    });
};
for (var i in e) {
    _loop_1(i);
}
