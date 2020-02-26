const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = "https://api.darksky.net/forecast/08be56c4ff0eeb7fcc6e6b53548ba460/" + latitude + "," +longtitude;
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('unable to connect wheater services !', undefined);
        }else if(body.error){
            callback('unable to find the wheater', undefined);
        }else{
            callback(undefined, 
                body.daily.data[0].summary+' the temperatur is '+
                body.currently.temperature+' Degrees, and the precipProbability is '+
                body.currently.precipProbability +'%'

            )
        }
    })
}

module.exports = forecast;