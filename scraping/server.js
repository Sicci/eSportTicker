var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'http://www.readmore.de/';
  //url = 'http://www.imdb.com/title/tt1229340/';
  request(url, function(error, response, html){
    if(!error){
	var $ = cheerio.load(html);
	
	var title, release, rating;
	//var match, gametype,team_one,team_two,time;
	//var json = { match:[{gametype:"",team_one:"",team_two:"",time:""}]
	
	
	var gameType, t1, t2, time;
	
	//var json = { match: [] };
	
	//title : "", release : ""};

	$('#nav_matchticker').filter(function(){
	//$('.header').filter(function(){
		var data = $(this).children();
		
		var matches = data.getElementsByClassName('clear');
		
		var tmpMatch = {gameType: "", t1:"", t2:""};
		
		console.log(matches);
	         //       release = data.children().last().children().text();

		       // json.title = title;

                // Once again, once we have the data extract it we'll save it to our json object

               // json.release = release;
	//	})

	})

	//fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//	console.log('File successfully written! - Check your project directory for the output.json file');

  //      })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
       // res.send('Check your console!')

   // })
   }
  })
  })

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;