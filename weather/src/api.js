
// Note there is was problem with the new iOS security blocking the http request
// Problem was solve using the following thread. Probably will not work when the
// new iOS coming out.

// http://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http

var _ = require('lodash'); // This is over killed. This lib just capitalize
                           // the first letter of a string. LOL
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=4b3262701766a0957fb653ae2cb1795e';

var kelvinToF = function(kelvin){
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F'
};

module.exports = function(latitude, longitude){
  // This is Es6 template string. Work better than string concatination.
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  // With fetch(), the first then is not useable so we need another then method.
  return fetch(url)
    .then(function(response){
      return response.json(); // This is going to produce the json data. However
                              // it doesn't necessary return json but a promise.
                              // Therefore to get the json object we must return
                              // the product of json and add on to another 'then'.
    })
    .then(function(json){   // The 2nd then will give us the actuall json data
                            // we need.
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
