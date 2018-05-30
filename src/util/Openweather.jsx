const API_KEY = "4b6f6cdcae3e85a78c760cbc7cc76c91";

const OpenWeather = {
    fetchCurrentData(cityName) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${API_KEY}`).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });
    },

    fetchFiveDays(cityName, countryCode) {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&units=imperial&APPID=${API_KEY}`).then((response) => {
           return response.json();
        }).then((data) => {
            return data;
        });
    }
}

export default OpenWeather;