const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=40bd3d7c08ac22fe81cebe591aa73b01&query=' +latitude+', '+longitude

    request({url,json: true}, (error, {body}) => {
        if(error){
            callback("Not able to fetch weather details", undefined)
        }
        else if(body.error){
            callback("Unable to find location", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+ " currently. It is currently " +body.current.temperature+ " degrees out.There is a " +body.current.precip+ "% chance of rain, with a visibility of " +body.current.visibility+ " km.")
        }
    })
}

module.exports= forecast