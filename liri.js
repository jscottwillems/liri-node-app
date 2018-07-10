require("dotenv").config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require('./key.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

switch (command) {
    case 'my-tweets':

        client.get('statuses/user_timeline', {
            screen_name: 'jscottwillems',
            count: 10
        }, function (error, tweets, response) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        })
        break;

    case 'spotify-this-song':

        let song = process.argv.slice(3).join(' ');
        spotify.search({
            type: 'track',
            query: song
        }, function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].href);
            console.log(data.tracks.items[0].album.name);
        });

        break;
    case 'movie-this':

        var movie = process.argv.slice(3).join('+');

        request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
            if (error) {
                return console.log('Error occured: ' + error);
            }
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1]);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        });

        break;
    case 'do-what-it-says':

        fs.readFile('random.txt', 'utf8', function (error, data) {
            if (error) {
                return console.log('Error occured: ' + error);
            }
            var dataArr = data.split(',')
            console.log(dataArr);

        });

        break;
}