const request = require('request');


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoicml6YWZhaGxlcGkiLCJhIjoiY2s2Z2pjMXMyMmp4dzNkb2I1b2x4ODJzeCJ9.45nkFRomG9yLuAp2CTzJXg"
    request({url, json :true}, (error, {body}) => {
        if(error){
            callback('unable to connect location service', undefined);
        }else if(body.message){
            callback('insert the adress', undefined)
        }else if(body.features.length === 0){
            callback('unable to find location', undefined);
        }else{
            callback(undefined, {
                latitude : body.features[0].geometry.coordinates[0],
                longtitude : body.features[0].geometry.coordinates[1],
                location : body.features[0].place_name
            })
        }
    })
}
 

module.exports = geocode;