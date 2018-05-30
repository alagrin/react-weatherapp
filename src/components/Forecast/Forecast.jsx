import React, { Component } from 'react';
import './Forecast.css';
//change to functional component w/ props arg?
class Forecast extends Component {
    
    renderFiveDayForecast = () => {
      return this.props.fiveDays.map((day) => {
        return(
          <div key={day[0]} className="single">
            <p>{day[0]}</p>
            <img src={`http://openweathermap.org/img/w/${day[1]}.png`} alt="icon"/>
            <p id="highTemp">{day[2]}</p>
            <p id="lowTemp">{day[3]}</p>
        </div>
        );
      });
    }

    render() {
        return (
            <div className="forecast">
                <div className="current content">
                  <div id="temp">{this.props.currentTemp}<span>&deg;</span><span>F</span></div>
                  <div className="details">
                    {this.props.currentWeather}
                  </div>
                </div>
                <div className="fivedays">
                  {this.renderFiveDayForecast()}
                </div>
              </div>
        );
    }
}

export default Forecast;