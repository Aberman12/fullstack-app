const request = require('request');
const express = require('express');
const $ = require('jQuery');




var requestSpotifyArtist = (artistName, cb) => {
console.log('artistname', artistName);
  // Retrieve an access token and a refresh token

  console.log('made it to helper', artistName)
var newArtistName = artistName.replace(' ', '%20');
// console.log('search query', newArtistName);
var options = {
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + newArtistName + "&prop=info&inprop=url&utf8=&format=json",

   dataType: "jsonp",
   success: function(response) {
       console.log('hits all right hereeeeeeeeeeeeee',response.query);
       if (response.query.searchinfo.totalhits === 0) {
         showError(newArtistName);
       }
       else {
         showResults(response);
       }
  }
};

  // let options = {
  //   method: 'GET',
  //   url: stuff + artistName,
  //   headers: {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json"
  //   }
  // };

  request(options, cb);
}
// requestSpotifyArtist('aerosmith horders');
module.exports.requestSpotifyArtist = requestSpotifyArtist;


// $.ajax(
//   {
//     method: "POST",
//     url: "https://accounts.spotify.com/api/token",
//     data: {
//       "grant_type":    "authorization_code",
//       "code":          code,
//       "redirect_uri":  myurl,
//       "client_secret": mysecret,
//       "client_id":     myid,
//     },
//     success: function(result) {
//       // handle result...
//     },
//   }
// );


// credentials are optional
