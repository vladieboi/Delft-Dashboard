// ---  DECLARE VARS
var greenLayer;
var greenLayerOn = false;

var bikeLayer;
var bikeLayerOn = false;

var trafficLayer;
var trafficLayerOn = false;

var parkingLayer;
var parkingLayerOn = false;

var legendCount = 0;

var bikeLegend = document.getElementById('legend-biketracks');
var trafficLegend = document.getElementById('legend-trafficview');
var greenLegend = document.getElementById('legend-greenspaces');
var parkingLegend = document.getElementById('legend-parking');

//        bikeLegend.style.display = 'block';


var navContainer = document.getElementById("myDiv");
var btns = navContainer.getElementsByClassName("navlist");

var map;

// ---  MAP DISPLAY 
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 52.011, lng: 4.357},
    	zoom: 13,
    	disableDefaultUI: true,
	});
	greenLayer = new google.maps.Data();
    greenLayer.loadGeoJson('http://data-delft.opendata.arcgis.com/datasets/8ec052576bd94271a354bddf6eccd287_1.geojson');
    bikeLayer = new google.maps.BicyclingLayer(); 
	trafficLayer = new google.maps.TrafficLayer();
    greenLayer.addListener('click', function(data_mouseEvent) {
          var feature = data_mouseEvent.feature;
          feature.toGeoJson(function(geojson){
            var infoWnd = new google.maps.InfoWindow({
              content: JSON.stringify(geojson.properties, null, 2),
              position: feature.getGeometry().getAt(0).getAt(0)
            });
            infoWnd.open(map);
          });
        });
     greenLayer.setStyle(function(feature){
        var styledProperty = feature.getProperty('OPPERVLAKTE');
        var color = "rgb(175, 255, 155)";
        if (styledProperty > 200 && styledProperty < 1000){
            color = "rgb(81, 216, 47)";
        } else if (styledProperty > 1000) {
            color = "rgb(26, 104, 6)";
        } return {
            fillColor: color,
            strokeColor: color, 
            strokeWeight: 1
        }
    });
}

// ---  ON OFF FUNCTIONS
function greenOnOff() {
    if (greenLayerOn == false){
        greenLayer.setMap(map); 
        greenLayerOn = true;
        legendCount++;
        greenLegend.classList.toggle("legend-content");
        document.getElementById("GreenButton").value="Greenery: ON"
    } else if (greenLayerOn == true){
        greenLayer.setMap(null);
        greenLayerOn = false;
        legendCount--;
        greenLegend.classList.remove("legend-content");
        document.getElementById("GreenButton").value="Greenery: OFF"
    }      
    legend();
}

function bikeOnOff(){
    if (bikeLayerOn == false){
		bikeLayer.setMap(map);
		bikeLayerOn = true;
        legendCount++;
        bikeLegend.classList.toggle("legend-content");
        document.getElementById("BikeButton").value="Bike Tracks: ON"
	} else if (bikeLayerOn == true){
		bikeLayer.setMap(null);
		bikeLayerOn = false;
        legendCount--;
        bikeLegend.classList.remove("legend-content");
		document.getElementById("BikeButton").value="Bike Tracks: OFF"
	}
    legend();
}

function trafficOnOff(){
	if (trafficLayerOn == false){
		trafficLayer.setMap(map);
		trafficLayerOn = true;
        legendCount++;
        trafficLegend.classList.toggle("legend-content");
		document.getElementById("TrafficButton").value="Traffic: ON"
	} else if (trafficLayerOn == true){
		trafficLayer.setMap(null);
		trafficLayerOn = false;
        legendCount--;
		document.getElementById("TrafficButton").value="Traffic: OFF"
        trafficLegend.classList.remove("legend-content");
	}
    legend();
}

function parkingOnOff(){
    if (parkingLayerOn == false){
        parkingLayer.setMap(map); 
        parkingLayerOn = true;
        legendCount++;
        parkingLegend.classList.toggle("legend-parkingspaces");
        document.getElementById("ParkingButton").value="Parking: ON"
    } else if (parkingLayerOn == true){
        parkingLayer.setMap(null);
        parkingLayerOn = false;
        legendCount--;
        parkingLegend.classList.remove("legend-content");
        document.getElementById("ParkingButton").value="Parking: OFF"
    }      
    legend();
}

/* ---  WORKING WMS DISPLAY ------------    (WHICH CAN BE LINKED TO A DEMONSTRATIONAL BUTTON)
function displayBuildings() {
	var WMSLayer = new google.maps.ImageMapType({
    	getTileUrl: function (coord, zoom) {
        	var proj = map.getProjection();
        	var zfactor = Math.pow(2, zoom);

        	// get Long Lat coordinates
        	var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
        	var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

        	//create the Bounding box string
        	var bbox =     top.lng() + "," +
                       bot.lat() + "," +
                       bot.lng() + "," +
                       top.lat();

        	//base WMS URL
        	var url = "http://geodata.nationaalgeoregister.nl/wijkenbuurten2014/wms?";
            	url += "REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&SRS=EPSG:4326&BBOX=" + bbox + "&WIDTH=256&HEIGHT=256";
            	url += "&LAYERS=" + "cbs_buurten_2014";
           	    url += "&STYLES=" + "wijkenbuurten_thema_buurten_gemeentewijkbuurt_gemiddeld_aantal_autos_per_huishouden";
           	    url += "&FORMAT=image/png" ;
            	url += "&TRANSPARENT=TRUE";
        	return url;
    	},
    tileSize: new google.maps.Size(256, 256),
    isPng: true
	});

map.overlayMapTypes.push(WMSLayer);
}
*/

// ---  NAVIGATION & CONTEXT MENU FUNCTIONS --- SHOW (CONTEXT-MENU DISPLAY) & ACTIVE (ACTIVE FOR NAVIGATION DISPLAY)
function show(elementID) {
	var home = document.getElementById('side-home');
	home.style.display = 'none';
	var ele = document.getElementById(elementID); // in case the user clicks on mobility 
	var pages = document.getElementsByClassName('side'); // --> getting 'side-mobility' ---- executing -> show('side-mobility');
	for(var i = 0; i < pages.length; i++) {
		pages[i].style.display = 'none';
	}
	ele.style.display = 'flex';
}

function legend() {
    var legend = document.getElementById('container-legend');
    if (legendCount > 0){
        legend.style.display = 'block';
        legendOn = true;
    } else if (legendCount == 0){
        legend.style.display = 'none';
        legendOn = false;
    }
}

function active(elementID) {
	var x = document.getElementsByClassName("navlistActive");
	for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("navlistActive");
	}
	var active = document.getElementById(elementID);
	active.classList.toggle("navlistActive");
}