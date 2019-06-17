"use strict";

// Basic express setup:

const PORT          = 8080;
require('dotenv').config();
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient   = require('mongodb').MongoClient;
//const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = process.env.MONGODB_URI;
//const url = "mongodb+srv://tweeteruser:NatWelBgGEzblskpuQCE@cluster0-gegyk.mongodb.net/test?retryWrites=true&w=majority";
//const url = 'mongodb://localhost:27017';
console.log('url: ', MONGODB_URI);
const assert = require('assert');
const dbName = 'tweeter';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db"); 
//const client = new MongoClient(url, { useNewUrlParser: true });

MongoClient.connect(MONGODB_URI, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);
  
  
});

// Mount the tweets routes at the "/tweets" path prefix:

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
