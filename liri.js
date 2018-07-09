require("dotenv").config();

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

console.log('this is working');