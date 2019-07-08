var queryString = require("querystring")
var express = require("express");
var path = require("path");
var router = express.Router();

// Import the model (celebrity.js) to use its database functions.
var celebrity = require("../models/celebrity.js");

router.get("/", function (req, res) {
  res.render("index")
});

router.get("/survey", function (req, res) {
  res.render("survey")
});

router.get("/results", function (req, res) {
  res.render("results")
})



// Create all our routes and set up logic within those routes where required.
router.get("/celebrities", function (req, res) {
  celebrity.all(function (data) {
    res.json({ celebrities: data });
  });
});

router.post("/api/results", function (req, res) {
  var gender = req.body.gender;
  var sign = req.body.zodiac;
  var matches = [];

  celebrity.all(function (celebrities) {
    console.log("gender selected: " + gender)
    console.log("sign selected: " + sign)

    for (var i = 0; i < celebrities.length; i++) {
      if (celebrities[i].gender === gender) {
        /*
         1 = Aries----Sagittarius
         2 = Taurus----Capricorn
         3 = Gemini----Leo 
         4 = Cancer----Virgo
         5 = Leo----Gemini
         6 = Virgo----Cancer
         7 = Libra----Aquarius
         8 = Scorpio----Pisces
         9 = Sagittarius----Aries
         10 = Capricorn----Taurus
         11 = Aquarius----Libra
         12 = Pisces----Scorpio
        */
        if (sign === "Aries") {
          if (celebrities[i].zodiac === "Sagittarius") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Taurus") {
          if (celebrities[i].zodiac === "Capricorn") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Gemini") {
          if (celebrities[i].zodiac === "Leo") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Cancer") {
          if (celebrities[i].zodiac === "Virgo") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Leo") {
          if (celebrities[i].zodiac === "Gemini") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Virgo") {
          if (celebrities[i].zodiac === "Cancer") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Libra") {
          if (celebrities[i].zodiac === "Aquarius") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Scorpio") {
          if (celebrities[i].zodiac === "Pisces") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Sagittarius") {
          if (celebrities[i].zodiac === "Aries") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Capricorn") {
          if (celebrities[i].zodiac === "Taurus") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Aquarius") {
          if (celebrities[i].zodiac === "Libra") {
            matches.push(celebrities[i])
          }
        } else if (sign === "Pisces") {
          if (celebrities[i].zodiac === "Scorpio") {
            matches.push(celebrities[i])
          }
        }
      }

    }
   var query = encodeURIComponent(matches)
    
  
    res.json(matches)
  })
  
  
})

router.post("/api/celebrities", function (req, res) {
  celebrity.create([
    "celebrity", "gender", "zodiac", "compatible_sign", "photo"
  ], [
      req.body.celebrity, req.body.gender, req.body.zodiac, req.body.compatible_sign, req.body.photo
    ], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

router.put("/api/celebrities/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  celebrity.update({
    sleepy: req.body.sleepy
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/celebrities/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  celebrity.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
