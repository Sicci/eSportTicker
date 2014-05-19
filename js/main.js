var settings_filter = [];
var settings_filter_unwanted = [];
var settings_spoiler;
var settings_showSettings;

if(localStorage["settings_filter"] == undefined) {
    alert("initialize localstorage settings filter");
    localStorage["settings_filter"] = JSON.stringify(["csgo","lol","sc2","dota2","wc3","hs"]);
}

if (localStorage["settings_filter_unwanted"] == undefined) {
    alert("initialize localstorage settings filter unwanted");
    localStorage["settings_filter_unwanted"] = JSON.stringify([]);
}

if(localStorage["settings_spoiler"] == undefined) {
    alert("initialize localstorage settings spoiler");
    localStorage["settings_spoiler"] = "false";
}

if (localStorage["settings_showSettings"] == undefined) {
    alert("initialize localstorage show settings");
    localStorage["settings_showSettings"] = "false";
}

$(document).on('pageinit',function(event){
    console.log("page initializing");
    initializeHeader();
});

function initializeHeader() {
    settings_filter = JSON.parse(localStorage["settings_filter"]);
    settings_filter_unwanted = JSON.parse(localStorage["settings_filter_unwanted"]);
    settings_spoiler = JSON.parse(localStorage["settings_spoiler"]);
    settings_showSettings = JSON.parse(localStorage["settings_showSettings"]);

    $.each(settings_filter, function(i, value) {
        $( "input."+value+"[type='checkbox']").prop( "checked", true ).checkboxradio( "refresh" );
    });
    $( "input#checkbox-settings-showSpoilers[type='checkbox']").prop( "checked", settings_spoiler ).checkboxradio( "refresh" );

    if (!settings_showSettings) {
        console.log("hide settings");
        $("#div_header_settings").addClass("hide");
        $("#img_settings").removeClass("glow");
    }
    else {
        $("#img_settings").addClass("glow");

    }
}

function changeSettingsFilter(data) {
    var found = jQuery.inArray(data, settings_filter);
    if (found >= 0) {
        // Element was found, remove it.
        settings_filter.splice(found, 1);
        settings_filter_unwanted.push(data);
    } else {
        // Element was not found, add it.
        settings_filter.push(data);
        //settings_filter_unwanted.splice(found, 1);
        settings_filter_unwanted = $.grep(settings_filter_unwanted, function(value) {
            return value != data;
        });
    }
    refreshLocalStorageSettingsFilter();
}

function hideUnwantedGames() {
    $.each(settings_filter_unwanted, function(i, value) {
        console.log("hide "+settings_filter_unwanted + " "+value);
        $(".li-"+value).addClass( "hide" );
    });
    $('#listview_main').listview('refresh');
}

function refreshLocalStorageSettingsFilter() {
    localStorage["settings_filter"] = JSON.stringify(settings_filter);
    localStorage["settings_filter_unwanted"] = JSON.stringify(settings_filter_unwanted);
    alert(settings_filter + " vs . "+settings_filter_unwanted);
}

$(document).ready(function(){
    $("#checkbox-csgo").change(function(){
        $(".li-csgo").toggleClass( "ui-screen-hidden" );

        changeSettingsFilter("csgo");
    });
    $("#checkbox-sc2").change(function(){
        $(".li-sc2").toggleClass( "ui-screen-hidden" );
        changeSettingsFilter("sc2");
    });
    $("#checkbox-dota2").change(function(){
        $(".li-dota2").toggleClass( "ui-screen-hidden" );
        changeSettingsFilter("dota2");
    });
    $("#checkbox-lol").change(function(){
        $(".li-lol").toggleClass( "ui-screen-hidden" );
        changeSettingsFilter("lol");
    });
    $("#checkbox-hs").change(function(){
        $(".li-hs").toggleClass( "ui-screen-hidden" );
        changeSettingsFilter("hs");
    });
    $("#checkbox-wc3").change(function(){
        $(".li-wc3").toggleClass( "ui-screen-hidden" );
        changeSettingsFilter("wc3");
    });
    $("#checkbox-settings-showSpoilers").change(function() {
        settings_spoiler = !settings_spoiler;
        localStorage["settings_spoiler"] = JSON.stringify(settings_spoiler);
        location.reload();
        $("#div_header_settings").css('display', 'block !important');
    });
});