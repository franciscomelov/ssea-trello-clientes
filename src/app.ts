//#?options=
const url: string = "https://trello.com/b/LwJLRHFA.json"
function Get(url: string) {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

var json_obj = JSON.parse(Get(url));
const container: HTMLElement | any = document.getElementById("app");


interface ICliente {
  id: number;
  name: string;
  desc: string;
}


const fetchData = (): void => {
  const url: string = window.location.href;
  const match: any = url.match('[=]');


  if (match == null) {
    let numeroCartas = json_obj.cards.length
    for (let i = 0; i < numeroCartas; i++) {
      getClient(i)
    }
  } else {
    const client = parseInt(url.slice(match.index + 1, url.length));
    getClient(client)
  }
}

const getClient = (id: number) => {
  const transformedClient = {
    id: id,
    name: json_obj.cards[id].name,
    desc: json_obj.cards[id].desc
  }

  ShowCLient(transformedClient)
}

const ShowCLient = (client: ICliente): void => {
  let output: string = `
  <div class="card" >
    <span class="card--id" >${client.id} </span>
    <h1 class=""card--name>${client.name}</h1>
    <span class="card--detail">${client.desc}</span>
  </div>
  `
  container.innerHTML += output
}

fetchData()

// Show relative url based on card
var e = document.getElementsByClassName('card');

console.log(e)
for(let i in e){
  e[i].addEventListener("click", function(){
    //do something here
    const newUrl: string ="http://127.0.0.1:5500/index.html#?options="+e[i].innerText[0]
    console.log(newUrl);
    //or call a function

});
}