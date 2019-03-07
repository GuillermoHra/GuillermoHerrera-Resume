const cred = require('./credentials.js')
const request = require('request')

// url example
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ3VpbGxlcm1vaHJhIiwiYSI6ImNqc3k0Z2g5NzBsbWo0NHF4cnFrcmwza24ifQ.ZsNrBe0CmSL6z4zWPBvDbA

// url example
// https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589

function getWeatherData(city) {
    const mapbox_init_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const mapbox_request = mapbox_init_url + `${city}.json?access_token=${cred.MAPBOX_TOKEN}`
    const darksky_init_url = `https://api.darksky.net/forecast/${cred.DARK_SKY_SECRET_KEY}/` 
    request(mapbox_request, function(error, response, body){
        if (error) {
            console.log('error mapbox request:'+ error)
        }
        const data = JSON.parse(body)
        if(data.features === undefined || data.features.length === 0) {
            console.log('city name incorrect')
        }
        else {
            const longitude = data.features[0].center[0]
            const latitude = data.features[0].center[1]
            const darksky_request = darksky_init_url + `${latitude},${longitude}?units=si`
            request(darksky_request, function(error, response, bodyWeather){
                if (error) {
                    console.log('error darksky request:'+error)
                }
                const dataWeather = JSON.parse(bodyWeather)
                console.log(`Today is ${dataWeather.currently.summary} with current temperatures of ${dataWeather.currently.temperature} degree celsius and precipitation probability of ${dataWeather.currently.precipProbability*100}%`)
            })
        }
    })
}

if (process.argv.length < 3) {
    console.log(`You can input any city, like this: node app 'Los Angeles'. Running Monterrey`)
    getWeatherData('Monterrey')
}
else {
    getWeatherData(process.argv[2])
}