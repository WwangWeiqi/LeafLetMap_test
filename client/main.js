import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var map;

Template['map'].onRendered(function(){
map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


var polygon;
var rectangles = [];
  map.on('mousemove', function(event) {
    if (rectangles.length > 0) {
      map.removeLayer(polygon);
      for(var grid in rectangles){
      	map.removeLayer(rectangles[grid]);
      }
      rectangles = [];

    }


    var latFloor = Math.floor(event.latlng.lat * 10)/10;
    var latCeil = Math.ceil(event.latlng.lat * 10)/10;
    var lngFloor = Math.floor(event.latlng.lng * 10)/10;
    var lngCeil = Math.ceil(event.latlng.lng * 10)/10;

    var latDis = (latCeil-latFloor)/25;
    var lngDis = (lngCeil-lngFloor)/25;

    var latlngs = [[latFloor, lngFloor],[latFloor, lngCeil],[latCeil, lngCeil],[latCeil, lngFloor]];
    polygon = L.polygon(latlngs, {color: '#0AE0CE',weight: 1}).addTo(map);
    for(var i = latFloor; i <= latCeil;) {
    	for(var j = lngFloor; j <= lngCeil;) {
    	var bounds =[[i,j],[i+latDis,j+=lngDis]];
    	rectangles.push(L.rectangle(bounds, {color: '#0AE0CE', weight: 0.5}).addTo(map));
    }

    i += latDis;
    j = lngFloor;
    }

  });


})











