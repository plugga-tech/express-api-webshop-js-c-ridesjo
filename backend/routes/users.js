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

module.exports = router;




/* Hämta specifik user - hela objektet */

/* Skapa user */

/* Logga in user */