mapboxgl.accessToken = 'pk.eyJ1Ijoic3R1ZGVudDE4MDk1NzIwIiwiYSI6ImNrOTE4ZHBqajAwbjIzZ3BsZnRjbXB6Y2QifQ.sLu4RktHUr3hBA0rP8yVCA';
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = 'fdf63caba90d7a0a623cec8d0b1e5104';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/student18095720/ck9a329h500nm1ioc0zmv62pq',
  center: [5.463382, 52.138567],
  zoom: 6,
});

var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.904068, 52.327089]
  },
  {
    name: 'Rotterdam',
    coordinates: [4.437874, 51.951928]
  },
  {
    name: 'Den Haag',
    coordinates: [4.269756, 52.057549]
  },
  {
    name: 'Hoogeveen',
    coordinates: [6.447530, 52.720402]
  },
];

map.on('load', function() {
    cities.forEach(function(city) {
        var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];
        
        fetch(request)
        .then(function(response) {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        
        .then(function(data) {
            var graden = Math.round(data['main']['temp'] - 272.15) + ' °C';
            var feelsLike = Math.round(data['main']['feels_like'] - 272.15) + ' °C';
            var beschrijving = data['weather'][0]['description'];
            var markerBericht = new mapboxgl.Popup().setHTML('<h2>' + city.name +'</h2>' +'<span class="graden"><b>Graden:</b> '+ graden +' </span>' +'<span class="gevoelsTemp"><b>Gevoelstemperatuur:</b> '+ feelsLike +' </span>' +'<span class="luchtBeschrijving"><b>Lucht:</b> '+ beschrijving +' </span>');

            new mapboxgl.Marker()
            .setLngLat(city.coordinates)
            .setPopup(markerBericht)
            .addTo(map)
            
            console.log(data);
        })
        
    });
});