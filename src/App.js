import React, { Component } from 'react';
import OpenWeather from './util/Openweather';
import SearchBar from './components/SearchBar/SearchBar';
import Forecast from './components/Forecast/Forecast';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: [],
      currentTemp: '',
      isCityEntered: false,
      fiveDays: [],
      error: ''
    };
  }
  
  capitalize(str) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    return str.join(" ");
  }

  onSearch = (searchTerm) => {

   OpenWeather.fetchCurrentData(searchTerm).then(data => {
     if (data.main) {
      let currentTemp = Math.floor(data.main.temp);
      let humidity = data.main.humidity;
      // let countryCode = data.sys.country.split().join("").toLowerCase();
      let info = data.weather.map(text => {
        return(
          <div id="current-info" key={text['id']}>
            <p id="descrip">{this.capitalize(text['description'])}</p>
            <p>{humidity}% Humidity</p>
          </div>
        );
      });
      this.setState({
        currentWeather: info,
        currentTemp: currentTemp,
        isCityEntered: true,
        error: false
      });
    } else {
      this.setState({
        currentWeather: null,
        isCityEntered: false,
        error: 'Invalid City Name'
      });
    }
  });

   OpenWeather.fetchFiveDays(searchTerm).then(data => {
    if (data.list) {
     let weatherList = data.list;
     let fiveDayForecast = [];

     for (let i = 0; i < weatherList.length; i += 8) {
       let date = moment.unix(weatherList[i].dt).format("MMM DD");
       let maxTemp = Math.floor(weatherList[i].main.temp_max);
       let minTemp = Math.floor(weatherList[i].main.temp_min);
       let iconCode = weatherList[i].weather[0].icon;
       //Unable to access actual values due to API
       fiveDayForecast.push([date, iconCode, maxTemp, minTemp]);
     }
     this.setState({
       fiveDays: fiveDayForecast
      });
    }
  });
}

  clearData = () => {
    this.setState({
      isCityEntered:false,
      error: ''
    });
    document.getElementById("searchbar").reset();
  }

  render() {
    const isCityEntered = this.state.isCityEntered;

    const displayForecast = isCityEntered ? (
      <Forecast 
        currentTemp={this.state.currentTemp}
        city={this.state.city}
        currentWeather={this.state.currentWeather}
        fiveDays={this.state.fiveDays}
      />
    ) : (
      <div>Your forecast awaits...</div>
    );

    return (
            <div className="App card">
              <SearchBar 
                onSearch={this.onSearch}
                clearData={this.clearData}
              />
              {this.state.error && <div>{this.state.error}</div>}
              {displayForecast}
            </div>   
    );
  }
}

export default App;
