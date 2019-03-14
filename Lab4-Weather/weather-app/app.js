const cred = require('./credentials.js')
const request = require('request')

// url example
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ3VpbGxlcm1vaHJhIiwiYSI6ImNqc3k0Z2g5NzBsbWo0NHF4cnFrcmwza24ifQ.ZsNrBe0CmSL6z4zWPBvDbA

// url example
// https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589

function getWeatherData(city, callback) {
    const mapbox_init_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const mapbox_request = mapbox_init_url + `${city}.json?access_token=${cred.MAPBOX_TOKEN}`
    const darksky_init_url = `https://api.darksky.net/forecast/${cred.DARK_SKY_SECRET_KEY}/` 
    request(mapbox_request, function(error, response, body){
        if (error) {
            callback(error, undefined) 
        }
        else{
            const data = JSON.parse(body)
            if(data.message == 'Not Authorized - Invalid Token') {
                callback('Invalid Mapbox Token', undefined)
            }
            else if(data.features === undefined || data.features.length === 0 || data.features[0].text != city) {
                callback(`City name was not found, did you mean ${data.features[0].text}?`, undefined)
            }
            else {
                const longitude = data.features[0].center[0]
                const latitude = data.features[0].center[1]
                const darksky_request = darksky_init_url + `${latitude},${longitude}?units=si`
                request(darksky_request, function(error, response, bodyWeather){
                    if (error) {
                        callback(error, undefined)
                    }
                    else {
                        if(bodyWeather == "Forbidden\n") {
                            callback('Invalid Darksky Token', undefined)
                        }
                        else {
                            const dataWeather = JSON.parse(bodyWeather)
                            var body = `Today is ${dataWeather.currently.summary} with current temperatures of ${dataWeather.currently.temperature} degree celsius and precipitation probability of ${dataWeather.currently.precipProbability*100}%`
                            callback(undefined, body)
                        }
                    }
                })
            }
        }
    })
}

if (process.argv.length < 3) {
    console.log(`You can input any city, like this: node app 'Los Angeles'. Running Monterrey`)
    getWeatherData('Monterrey', function(error, response){
        if(error) {
            if(error.errno == 'ENOTFOUND') {
                console.log('Error with the connection, check your connection')
            }
            else {
                console.log(error)
            }
        } else {
            console.log(response)
        }
    })
}
else {
    getWeatherData(process.argv[2], function(error, response){
        if(error) {
            if(error.errno == 'ENOTFOUND') {
                console.log('Error with the connection, check your connection')
            }
            else {
                console.log(error)
            }
        } else {
            console.log(response)
        }
    })
}