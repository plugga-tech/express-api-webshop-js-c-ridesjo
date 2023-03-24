var express = require('express');
var router = express.Router();
//const fs = require("fs");
//const { ObjectId } = require("mongodb");

/*   let users = [
  {id: 1, name: "Sven Svensson", email: "sven@gmail.com"},
  {id: 1, name: "Stina Svensson", email: "stina@gmail.com"},
  {id: 1, name: "Sara Svensson", email: "sara@gmail.com"},
  {id: 1, name: "Sture Svensson", email: "sture@gmail.com"},
]  */

/* Hämta alla användare - id, namn, email */

/* router.get('/users', function(req, res) {
  res.json(users);
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    res.send(data)
    return;
  }
  )
}); */

router.get('/api/', function(req, res) {
  req.app.locals.db.collection("users").find().toArray()    
  .then(results => {
    console.log(results);

    let printUsers = "<div><h2>Våra users</h2>"

    for (user in results) {
      printUsers += "<div>" + results[user].name + "</div>"
    }

    printUsers += "</div>" 

    res.send(printUsers);
   
  })
 
});


/* Hämta specifik användare - hela objektet */
router.get('/api/', function(req, res) {

  let findUser = "Camilla";
/*   userId = req.params.userId;
  console.log(userId); */

  req.app.locals.db.collection("users").find({"name": findUser}).toArray()   

  .then(result => {
    console.log(result);
    let printUsers = "<div><h2>Våra users</h2>"

    for (user in results) {
      printUsers += "<div>" + results[user].name + "</div>"
    }

    printUsers += "</div>" 

    res.send(printUsers);
  })

/*   let findUser = users.find(user => user.id == userId);

      res.json(findUser); */
});

/* Lägg till ny användare */

/* router.post('/add', function(req, res) {
  let newUser = { name: req.body.name };    //skapar ny användare
  fs.readFile("users.json", function(err, data){  //hämtar filen users.json 
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data)    //sparar innehållet från filen i en ny users-lista
    newUser.id = users.length + 1;  //lägger till ny användare i users-listan
    let passwordToSave = crypto.SHA3(req.body.password).toString();  //skapar lösenord som krypteras (SH3A vanligt att använda men även AES.encrypt)
    newUser.password = passwordToSave;
    users.push(newUser);
    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {  //skriver över json-filen med det nya innehållet
      if(err) {
        console.log(err)
      }
      res.json(users)
    })
  })
}); */

router.post('/api/add', function(req, res) {
/*   let newUser = { name: req.body.name };
  let passwordSave = crypto.SHA3(req.body.password).toString();
  newUser.password = passwordSave

  console.log(newUser); */

  req.app.locals.db.collection("users").insertOne(req.body)
  .then(result => {
    console.log(result);
    res.redirect("/show");
  })
});

/* Logga in användare */
router.post('/api/login', function(req, res) {
  const { name, password } = req.body;
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data);
    const foundUser = users.find(user => user.name === name);
    if(crypto.SHA3(password).toString() === foundUser.password) {
      res.status(201).json({name: foundUser.name, id: foundUser.id})
    }
    else {
      res.status(401).json("Incorrect password or username")
    }
    return;
  })
});

router.get('/test', function(req, res) {
  res.send('testrouter');
});

module.exports = router;