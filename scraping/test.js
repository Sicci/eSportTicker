var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var url = 'http://www.readmore.de/';

 request(url, function (error, response, html) {
 	if (!error) {
 		var $ = cheerio.load(html);
		var gameType, t1, t2, timeOrResult, time, result;
		var json = {matches:[]}
 		$('#nav_matchticker').filter(function () {
 			var matches = $(this).children('.clear');
 			matches.each(function (i) {
			var tmpMatch = {gameType: "", t1:"", t2:"", time:"", result:""};
			if (i != matches.length - 1) { //don't scrape the last element (Datum:gestern - heute - morgen...)
 				var match = $(this).children();
				
				
				var gameType = match.first().attr('class').split(" ")[0]
				var t1 = $(match[0]).text();
				var t2 = $(match[2]).text();
				
				var timeOrResult = $(match[3]).text();
				if (timeOrResult.indexOf("h") >= 0 || timeOrResult.indexOf(".") >= 0 ) {
					var time = timeOrResult;
					var result = "";
					
					}
				else if (timeOrResult.indexOf("live") >= 0) {
					var result = "";
					var time = "live";
				}
				else {
					var result = timeOrResult;
					var time = "";
				}
				
				tmpMatch.gameType = gameType;
				tmpMatch.t1 = t1;
				tmpMatch.t2 = t2;
				tmpMatch.time = time;
				tmpMatch.result = result;
				//console.log("time: " + time + " result: "+result);
				//console.log(t1 + ' vs. '+t2);
				json.matches.push(tmpMatch);
				}
 				/*match.each(function () {
					
 					console.log($(this).html());
 				});*/
 			});
 		})
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			console.log('File successfully written! - Check your project directory for the output.json file');
		})
 	}
 })
 
