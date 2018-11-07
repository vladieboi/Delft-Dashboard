// ---  DECLARE VARS
var greenLayer;
var greenLayerOn = false;

var bikeLayer;
var bikeLayerOn = false;

var trafficLayer;
var trafficLayerOn = false;

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
	bikeLayer = new google.maps.BicyclingLayer(); 
	trafficLayer = new google.maps.TrafficLayer();  
}
map.data.addListener('mouseover', function(event) {
         feature.forEachProperty(function(value,property) {

                 console.log(property,':',value);
         });

    })

// ---  ON OFF FUNCTIONS
function greenOnOff() {
    if (greenLayerOn == false){
        greenLayer.loadGeoJson('http://data-delft.opendata.arcgis.com/datasets/8ec052576bd94271a354bddf6eccd287_1.geojson');
        greenLayer.setStyle({
            fillColor: 'green',
            strokeColor: 'green', 
            strokeWeight: 1
        });
        greenLayer.setMap(map); 
        greenLayerOn = true;
        document.getElementById("GreenButton").value="Greenery: ON"
    } else if (greenLayerOn == true){
        greenLayer.setMap(null);
        greenLayerOn = false;
        document.getElementById("GreenButton").value="Greenery: OFF"
    }      
}

function bikeOnOff(){
	if (bikeLayerOn == false){
		bikeLayer.setMap(map);
		bikeLayerOn = true;
		document.getElementById("BikeButton").value="Bike Tracks: ON"
	} else if (bikeLayerOn == true){
		bikeLayer.setMap(null);
		bikeLayerOn = false;
		document.getElementById("BikeButton").value="Bike Tracks: OFF"
	}
}

function trafficOnOff(){
	if (trafficLayerOn == false){
		trafficLayer.setMap(map);
		trafficLayerOn = true;
		document.getElementById("TrafficButton").value="Traffic: ON"
	} else if (trafficLayerOn == true){
		trafficLayer.setMap(null);
		trafficLayerOn = false;
		document.getElementById("TrafficButton").value="Traffic: OFF"
	}
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

// ---  NAVIGATION & CONTEXT MENU FUNCTIONS --- SHOW (CONTEXT-MENU DISPLAY) & ACTIVE (ACTIVE NAVIGATION DISPLAY)
function show(elementID) {
	var home = document.getElementById('side-home');
	home.style.display = 'none';
	var ele = document.getElementById(elementID); // in case the user clicks on mobility --> getting 'side-mobility' ---- executing -> show('side-mobility');
	var pages = document.getElementsByClassName('side');
	for(var i = 0; i < pages.length; i++) {
		pages[i].style.display = 'none';
	}
	ele.style.display = 'flex';
}

function active(elementID) {
	var x = document.getElementsByClassName("navlistActive");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].classList.remove("navlistActive");
	}
	var active = document.getElementById(elementID);
	active.classList.toggle("navlistActive");
}