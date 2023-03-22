var express = require('express');
var router = express.Router();
const fs = require("fs");

/* Hämta alla users - allt utom lösenord */
router.get('/', function(req, res) {
  //res.json(users);
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    res.send(data)
    return;
  }
  )
});

/* Hämta specifik user - hela objektet */
router.get('/:userId', function(req, res, next) {
  userId = req.params.userId;
  console.log(userId);

  let findUser = users.find(user => user.id == userId);

  res.json(findUser);
});

/* Skapa user */
router.post('/', function(req, res) {
  let newUser = { name: req.body.name };    //skapar ny användare
  fs.readFile("users.json", function(err, data){  //hämtar filen users.json 
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data)    //sparar innehållet från filen i en ny users-lista
    newUser.id = users.length + 1;  //lägger till ny användare i users-listan
/*     let passwordToSave = crypto.SHA3(req.body.password).toString();  //skapar lösenord som krypteras (SH3A vanligt att använda men även AES.encrypt)
    newUser.password = passwordToSave; */
    users.push(newUser);
    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {  //skriver över json-filen med det nya innehållet
      if(err) {
        console.log(err)
      }
      res.json(users)
    })
  })
});


/* Logga in user */



module.exports = router;