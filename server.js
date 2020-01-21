//import { express } from "./node_modules/express/index";

console.log("Mon premier service JS");

const express_module = require("express");

const server = express_module();

server.listen(4000, () => {
    console.log("Le service est démarré.");
    console.log(`${clients.length} clients enregistrés.`)
});

// Request Body application/json
server.use(express_module.json());

// Configuration par défaut de la réponse
server.use( (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type"); // Origin, X-Requested-With, Accept
    // // res.header("Access-Control-Allow-Methods", "*");
    res.contentType("application/json");
    next();
} );

server.get("/bonjour", (req, res, next) => { // requête GET http://localhost/bonjour
    res.contentType = "text/plain";

    console.log("yeah, on m'appelle !!!");
    res.send("Bonjour Mr. !");
});

server.get("/clients", (req, res, next) => {
    res.send( JSON.stringify(clients) ); // [{"nom":"...","prenom":"..."},{...},...]
});

server.get("/clients/:id", (req, res, next) => { //  
    let id = req.params.id;
    let client = read(id);
    res.send( JSON.stringify(client) );
});

server.post("/clients", (req, res, next) => {
    console.log(req.body);
    // let client = JSON.parse(req.body);
    let client = req.body;
    create(client.nom, client.prenom);
    res.statusCode = 201;
    res.send();
});


/* Gestion des données Client */

let ID = 0;

class Client {

    constructor(nom, prenom){
        this.id = ID++;
        this.nom = nom.toUpperCase();
        this.prenom = prenom;
    }

    get nomComplet(){
        return this.prenom + ' ' + this.nom;
    }

}

const clients = []; // [{nom:"...", prenom:"..."}, {...}, {...}]
clients.push( new Client("Ainslie", "Ben") );
clients.push( new Client("Scheidt", "Robert") );
clients.push( new Client("Burling", "Peter") );

// CRUD : create, read, update, delete

function create(nom, prenom){
    clients.push( new Client(nom, prenom) )
}
function read(id){
    return clients.find( cli => cli.id == id  );
}
function readAll(){
    return clients;
}
