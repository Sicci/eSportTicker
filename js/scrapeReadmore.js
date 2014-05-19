var baseUrl = "http://www.readmore.de";
var jsonMatches = {matches:[]};

/*
* TODO: localstorage, initializeSettings, hideItemsAfterScraping, designHeader (margin-left, showSettingsOnBtnClick), designFooter
* http://www.gosugamers.net/
* */


$(document).ajaxSend(function() {
    setTimeout(function(){
        $.mobile.loading('show');
    },1);
});
$(document).ajaxComplete(function() {
    setTimeout(function(){
        $.mobile.loading('hide');
    },150);
});
$.ajax({
    url: baseUrl,
    type: "get",
    async: true,
    dataType: "",
    success: function(data) {
        var gameType, t1, t2, timeOrResult, time, result, live;
        var $foo = $('<form>' + data + '</form>');
        $foo.find('#nav_matchticker').filter(function () {
            var matches = $(this).children('.clear');
            matches.each(function (i) {
                var tmpMatch = {gameType: "", t1:"", t2:"", time:"", live:"", result:""};
                if (i != matches.length - 1) { //don't scrape the last element (Datum:gestern - heute - morgen...)
                    var match = $(this).children();
                    var gameType = match.first().attr('class').split(" ")[0]
                    var t1 = $(match[0]).text();
                    var t2 = $(match[2]).text();
                    var timeOrResult = $(match[3]).text();
                    if (timeOrResult.indexOf("h") >= 0 || timeOrResult.indexOf(".") >= 0 ) {
                        time = timeOrResult;
                        live = "";
                        result = "";
                    }
                    else if (timeOrResult.indexOf("live") >= 0) {
                        result = "";
                        live = "live";
                        time = "";
                    }
                    else {
                        result = timeOrResult;
                        time = "";
                        live="";
                    }
                    tmpMatch.gameType = gameType;
                    tmpMatch.t1 = t1;
                    tmpMatch.t2 = t2;
                    tmpMatch.time = time;
                    tmpMatch.live = live;
                    tmpMatch.result = result;
                    jsonMatches.matches.push(tmpMatch);
                }
            });
        });
        addJsonResultsToListview();
        //console.log(jsonMatches.matches);
    },
    error: function(status) {
    }
});

function showSpoiler(index) {
    $("#li-"+index+" .spoilerAlert").addClass("hide");
    $("#li-"+index+" .result").removeClass("hide");
}

function addJsonResultsToListview() {
    var htmlListObject = "";
    $.each(jsonMatches.matches, function(i, match) {
        htmlListObject = "<li id='li-"+i+"' class='li-"+match.gameType+"'>" +
            "<img class='ui-li-icon' src='images/"+ match.gameType+".png'/> <strong>"+match.t1+"</strong> vs. <strong>"+ match.t2+"</strong> " +
            "<span class='ui-li-aside'>";
        if (match.time != "") {
            htmlListObject+="<span class='time'> "+ match.time+"</span>";
        }
        else if (match.live != "") {
            htmlListObject+="<span class='live'>"+ match.live +"</span>";
        }
        else if (match.result != "") {
            if (settings_spoiler) {
                htmlListObject+="<span class='result'>"+match.result+"</span>";
            }
            else {
                htmlListObject+="<span class='spoilerAlert'><a href='#' onclick='showSpoiler("+i+")'>Score</a></span><span class='result hide'>"+match.result+"</span>";
            }
        }
        htmlListObject+="</span></li>";
        $('#listview_main').append(htmlListObject);
    });
    hideUnwantedGames();
    $('#listview_main').listview('refresh');
}