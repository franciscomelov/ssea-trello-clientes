https://www.daniweb.com/programming/web-development/threads/348128/creating-an-html-page-automatically
 
 const url: string = "https://trello.com/b/LwJLRHFA.json"
function Get(url: string){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get(url));

//json_obj.cards[id].labels[0].color
const container: HTMLElement | any = document.getElementById("app")


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

const getClient =  (id: number)  => {    

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
    <span class="card--id" >#${ client.id} </span>
    <h1 class=""card--name>${client.name}</h1>
    <span class="card--detail">${client.desc}</span>

  </div>
  `
  container.innerHTML += output
}

fetchData()