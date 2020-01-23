const request = require("request");

const forecast = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/24fef8bcba7eecc7318a8441ec9e4c7c/${lat},${long}?lang=ta&units=si`;
    request( {url, json: true}, (error,{body}) => {
        if(error) {
            callback(`Unalble to connect the server.`,undefined);
        } else if(body.error) {
            callback(body.error,undefined);
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} 'C out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast