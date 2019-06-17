"use strict";

const userHelper    = require("../lib/util/user-helper")

const blankDoodle   = require("../lib/util/blank-doodle").blankCanvas;
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {
  
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    let doodleMessageBody = req.body.imgData;

    // Sever-side error handling
    if (!req.body.text && doodleMessageBody === blankDoodle) {
      console.log("Neither tweet or doodle was sent");
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    
    if(doodleMessageBody === blankDoodle) {
      console.log("blank doodle was sent");
      doodleMessageBody = null;
      //res.send("give me a real doodle");
      //res.status(400).json({ error: 'invalid request: no doodle in POST body'});
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text,
        doodle: doodleMessageBody
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err, value) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (value) {
        console.log(value);
        // Send back response
        res.status(201).send(tweet);
      }
    });
  });

  // tweetsRoutes.post("/tweets", function(req, res) {
  //   console.log("Tweet received");
  //   res.send("Tweet Received");

  // });

  return tweetsRoutes;

}
