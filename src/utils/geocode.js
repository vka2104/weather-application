const request = require('request');

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmFzYW50aGcydCIsImEiOiJjazVtc2Zwd20wMDEwM2twMW1ucG42azNtIn0.MsbvE5fA-B_CQ9xM40EYrw&limit=1`;
    request( {url, json: true}, (error,{body}) => {
        if(error) {
            callback("Unalble to connect the server", undefined);
        } else if(body.message) {
            callback(body.message,undefined);
        } else if(body.features.length === 0) {
            callback("Unknown search location..! . Try another",undefined);
        } else {
            callback(undefined,{
                 longitude: body.feature,
                 latitude: body.features[0].center[1],
                 placename: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode