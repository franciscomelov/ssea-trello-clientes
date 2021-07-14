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
var clients: { id: any; name: any; desc: any; }[] = []

interface ICliente {
  id: number;
  name: string;
  desc: string;
}


const fetchData = (): void => {

    let numeroCartas = json_obj.cards.length
    for (let i = 0; i < numeroCartas; i++) {
      getClient(i)
    }
  

  
}

const getClient = (id_num: number) => {
  const current_url: string = window.location.href;
  const match: any = current_url.match('[=]');

  
  const transformedClient = {
    id : json_obj.cards[id_num].id,
    name: json_obj.cards[id_num].name,
    desc: json_obj.cards[id_num].desc
  }
  clients.push(transformedClient)
  

  
  if(match == null){
    ShowCLient(transformedClient)
  }else{ 
    const id =  json_obj.cards[id_num].id;
    const client = current_url.slice(match.index + 1, current_url.length)
    if(id == client){
      const transformedClient = {
        id : json_obj.cards[id_num].id,
        name: json_obj.cards[id_num].name,
        desc: json_obj.cards[id_num].desc
      }
      ShowCLient(transformedClient)
    }
    
    

  }
  

    

  
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




//Show relative url based on card
var e = document.getElementsByClassName('card');
for(let i in e){
  e[i].addEventListener("click", function(){
    //do something here
    let sub_id = e[i].innerText
    var result = sub_id.search(/\n/);
    const id = sub_id.substring(0,result)

    const newUrl: string ="http://127.0.0.1:5500/index.html#?options="+id;
    console.log(newUrl)
    
  
    //or call a function

});
}